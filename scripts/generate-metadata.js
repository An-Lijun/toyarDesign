import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const COMPONENTS_DIR = path.join(__dirname, '../src/package/components')
const OUTPUT_DIR = path.join(__dirname, '../dist')

const typeMap = {
  String: 'string',
  Number: 'number',
  Boolean: 'boolean',
  Object: 'object',
  Array: 'array',
  Function: 'function',
  Element: 'HTMLElement',
}

function parseStaticPropsFromSource(sourceCode) {
  const result = {}
  const staticPropsMatch = sourceCode.match(/export\s+const\s+staticProps\s*=\s*\{([\s\S]*?)\}(?=\s*export|$)/)
  
  if (!staticPropsMatch) return result
  
  const propsContent = staticPropsMatch[1]
  const braceStack = []
  let currentPropName = null
  let propBuffer = ''
  
  for (let i = 0; i < propsContent.length; i++) {
    const char = propsContent[i]
    
    if (char === '{') {
      braceStack.push('{')
    } else if (char === '}') {
      braceStack.pop()
      
      if (braceStack.length === 0 && currentPropName) {
        const propConfig = parsePropConfig(propBuffer)
        result[currentPropName] = propConfig
        currentPropName = null
        propBuffer = ''
      }
    } else if (braceStack.length === 0 && !currentPropName) {
      const propNameMatch = propsContent.slice(i).match(/^['"]?([\w-]+)['"]?\s*:\s*\{/)
      if (propNameMatch) {
        currentPropName = propNameMatch[1]
        i += propNameMatch[0].length - 1
        braceStack.push('{')
      }
    } else if (braceStack.length === 1 && currentPropName) {
      propBuffer += char
    }
  }
  
  return result
}

function parsePropConfig(configStr) {
  const config = {
    type: 'unknown',
    default: null,
    required: false,
    description: '',
    values: [],
  }
  
  const typeMatch = configStr.match(/type:\s*(\w+)/)
  if (typeMatch) {
    config.type = typeMap[typeMatch[1]] || typeMatch[1].toLowerCase()
  }
  
  const valuesMatch = configStr.match(/values:\s*(\[[^\]]+\])/)
  if (valuesMatch) {
    try {
      config.values = JSON.parse(valuesMatch[1].replace(/'/g, '"'))
    } catch (e) {
      config.values = []
    }
  }
  
  const defaultMatch = configStr.match(/default:\s*(.+)/)
  if (defaultMatch) {
    config.default = parseDefaultValue(defaultMatch[1].trim())
  }
  
  const requiredMatch = configStr.match(/required:\s*(true|false)/)
  if (requiredMatch) {
    config.required = requiredMatch[1] === 'true'
  }
  
  return config
}

function parseDefaultValue(value) {
  if (value === 'true') return true
  if (value === 'false') return false
  if (value === 'undefined') return null
  if (value === 'null') return null
  if (!isNaN(value)) return Number(value)
  
  const stringMatch = value.match(/^['"](.*)['"]/)
  if (stringMatch) {
    return stringMatch[1]
  }
  
  if (value.endsWith(',')) {
    return parseDefaultValue(value.slice(0, -1).trim())
  }
  
  return null
}

function parseEmitsFromSource(sourceCode) {
  const result = {}
  
  const emitRegex = /['"]?([\w-]+)['"]?\s*:\s*\(([^)]*)\)\s*=>\s*true/g
  let emitMatch
  
  while ((emitMatch = emitRegex.exec(sourceCode)) !== null) {
    const emitName = emitMatch[1]
    const params = emitMatch[2]
      .split(',')
      .map(p => p.trim())
      .filter(Boolean)
    
    result[emitName] = {
      params,
      description: '',
    }
  }
  
  return result
}

function extractSlotsFromVueFile(vueFilePath) {
  const content = fs.readFileSync(vueFilePath, 'utf-8')
  const slotRegex = /<slot\s*(?:name="([^"]+)")?\s*\/?>/g
  const slots = []
  let match
  while ((match = slotRegex.exec(content)) !== null) {
    const slotName = match[1] || 'default'
    if (!slots.includes(slotName)) {
      slots.push(slotName)
    }
  }
  return slots
}

function extractComponentNameFromVueFile(vueFilePath) {
  const content = fs.readFileSync(vueFilePath, 'utf-8')
  const nameMatch = content.match(/defineOptions\(\s*\{[^}]*name:\s*["']([^"']+)["'][^}]*\}\s*\)/)
  return nameMatch ? nameMatch[1] : null
}

function generateComponentMetadata(componentName) {
  const componentDir = path.join(COMPONENTS_DIR, componentName)
  const srcDir = path.join(componentDir, 'src')
  
  if (!fs.existsSync(componentDir)) {
    console.error(`组件目录不存在: ${componentDir}`)
    return null
  }

  const contextPath = path.join(srcDir, 'context.ts')
  const vueFilePath = path.join(srcDir, `${componentName}.vue`)
  
  let props = {}
  let emits = {}
  
  if (fs.existsSync(contextPath)) {
    try {
      const sourceCode = fs.readFileSync(contextPath, 'utf-8')
      props = parseStaticPropsFromSource(sourceCode)
      emits = parseEmitsFromSource(sourceCode)
    } catch (e) {
      console.warn(`解析 context.ts 失败: ${contextPath}`, e.message)
    }
  }

  const slots = fs.existsSync(vueFilePath) ? extractSlotsFromVueFile(vueFilePath) : []
  const componentNameFromVue = fs.existsSync(vueFilePath) ? extractComponentNameFromVueFile(vueFilePath) : null
  
  const metadata = {
    id: componentName.toLowerCase(),
    name: componentNameFromVue || `Ty${componentName.charAt(0).toUpperCase() + componentName.slice(1)}`,
    category: 'unknown',
    description: '',
    props,
    emits,
    slots,
    examples: [],
    capabilities: [],
    useCases: [],
  }

  return metadata
}

function generateManifest() {
  const components = []
  const entries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  
  console.log('🚀 开始为所有组件生成元数据...')
  console.log('='.repeat(80))
  
  let successCount = 0
  let failCount = 0
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      try {
        const metadata = generateComponentMetadata(entry.name)
        if (metadata) {
          components.push(metadata)
          
          const outputPath = path.join(COMPONENTS_DIR, entry.name, 'metadata.json')
          fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2))
          
          const propCount = Object.keys(metadata.props).length
          const emitCount = Object.keys(metadata.emits).length
          const slotCount = metadata.slots.length
          
          console.log(`✅ ${entry.name.padEnd(20)} props: ${String(propCount).padStart(2)} | emits: ${String(emitCount).padStart(2)} | slots: ${String(slotCount).padStart(2)}`)
          successCount++
        } else {
          console.log(`❌ ${entry.name.padEnd(20)} 生成失败`)
          failCount++
        }
      } catch (e) {
        console.log(`❌ ${entry.name.padEnd(20)} 异常: ${e.message}`)
        failCount++
      }
    }
  }

  console.log('='.repeat(80))
  
  const manifest = {
    version: '1.0.0',
    hash: Date.now().toString(36),
    components,
    generatedAt: new Date().toISOString(),
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'component-manifest.json'),
    JSON.stringify(manifest, null, 2)
  )

  console.log(`\n📦 component-manifest.json 已生成，共 ${components.length} 个组件`)
  console.log(`✅ 成功: ${successCount} 个`)
  console.log(`❌ 失败: ${failCount} 个`)
  return manifest
}

function generateSingleMetadata(componentName) {
  const metadata = generateComponentMetadata(componentName)
  if (metadata) {
    const outputPath = path.join(COMPONENTS_DIR, componentName, 'metadata.json')
    fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2))
    console.log(`✅ ${componentName} 组件元数据已生成: ${outputPath}`)
    return metadata
  }
  return null
}

export { generateManifest, generateSingleMetadata }

if (process.argv[1] === __filename) {
  const componentName = process.argv[2]
  if (componentName) {
    generateSingleMetadata(componentName)
  } else {
    generateManifest()
  }
}