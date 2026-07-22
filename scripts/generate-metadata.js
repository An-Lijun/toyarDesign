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

function parseImports(sourceCode) {
  const imports = []
  const importRegex = /import\s+(\{[^}]+\})\s+from\s+['"]([^'"]+)['"]/g
  let match
  
  while ((match = importRegex.exec(sourceCode)) !== null) {
    const namedImports = match[1]
      .replace(/[{}]/g, '')
      .split(',')
      .map(i => i.trim())
      .filter(Boolean)
    
    imports.push({
      modulePath: match[2],
      names: namedImports
    })
  }
  
  return imports
}

function resolveConstants(filePath, imports) {
  const constants = {}
  
  for (const imp of imports) {
    const resolvedPath = path.resolve(path.dirname(filePath), imp.modulePath)
    const resolvedTsPath = resolvedPath.endsWith('.ts') ? resolvedPath : `${resolvedPath}.ts`
    const resolvedIndexPath = path.join(resolvedPath, 'index.ts')
    
    let targetPath = null
    if (fs.existsSync(resolvedTsPath)) {
      targetPath = resolvedTsPath
    } else if (fs.existsSync(resolvedIndexPath)) {
      targetPath = resolvedIndexPath
    } else if (fs.existsSync(resolvedPath)) {
      targetPath = resolvedPath
    }
    
    if (targetPath) {
      try {
        const content = fs.readFileSync(targetPath, 'utf-8')
        
        for (const name of imp.names) {
          const constRegex = new RegExp(`export\\s+const\\s+${name}\\s*=\\s*(\\[[^\\]]+\\])`)
          const constMatch = content.match(constRegex)
          if (constMatch) {
            try {
              constants[name] = JSON.parse(constMatch[1].replace(/'/g, '"'))
            } catch (e) {
              constants[name] = []
            }
          }
        }
      } catch (e) {
        console.warn(`解析常量文件失败: ${targetPath}`, e.message)
      }
    }
  }
  
  return constants
}

function parsePropsObject(propsContent, constants = {}) {
  const result = {}
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
        const propConfig = parsePropConfig(propBuffer, constants)
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

function parsePropConfig(configStr, constants = {}) {
  const config = {
    type: 'unknown',
    default: null,
    required: false,
    description: '',
  }
  
  const typeMatch = configStr.match(/type:\s*(\w+)/)
  if (typeMatch) {
    config.type = typeMap[typeMatch[1]] || typeMatch[1].toLowerCase()
  }
  
  const arrayTypeMatch = configStr.match(/type:\s*\[([^\]]+)\]/)
  if (arrayTypeMatch) {
    const types = arrayTypeMatch[1]
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
      .map(t => typeMap[t] || t.toLowerCase())
    config.type = types.join(' | ')
  }
  
  const valuesMatch = configStr.match(/values:\s*(\[[^\]]+\])/)
  if (valuesMatch) {
    try {
      const parsedValues = JSON.parse(valuesMatch[1].replace(/'/g, '"'))
      if (parsedValues && parsedValues.length > 0) {
        config.values = parsedValues
      }
    } catch (e) {
    }
  } else {
    const valuesConstMatch = configStr.match(/values:\s*([\w]+)/)
    if (valuesConstMatch && constants[valuesConstMatch[1]]) {
      const constValues = constants[valuesConstMatch[1]]
      if (constValues && constValues.length > 0) {
        config.values = constValues
      }
    }
  }
  
  const descriptionMatch = configStr.match(/description:\s*['"`]([^'"`]+)['"`]/)
  if (descriptionMatch) {
    config.description = descriptionMatch[1]
  }
  
  const defaultMatch = configStr.match(/default:\s*([^,\n]+)/)
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
  
  const stringMatch = value.match(/^['"](.*?)['"]/)
  if (stringMatch) {
    return stringMatch[1]
  }
  
  if (value.endsWith(',')) {
    return parseDefaultValue(value.slice(0, -1).trim())
  }
  
  return null
}

function extractObjectContent(sourceCode, startIndex) {
  let braceCount = 1
  let inString = false
  let stringChar = ''
  
  for (let i = startIndex + 1; i < sourceCode.length; i++) {
    const char = sourceCode[i]
    
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = true
      stringChar = char
    } else if (inString && char === stringChar && sourceCode[i - 1] !== '\\') {
      inString = false
    } else if (!inString) {
      if (char === '{') {
        braceCount++
      } else if (char === '}') {
        braceCount--
        if (braceCount === 0) {
          return sourceCode.slice(startIndex, i + 1)
        }
      }
    }
  }
  return ''
}

function parsePropsFromSource(sourceCode, constants = {}) {
  let propsContent = ''
  
  const staticPropsMatch = sourceCode.match(/export\s+const\s+staticProps\s*=\s*\{([\s\S]*?)\}(?=\s*export|$)/)
  if (staticPropsMatch) {
    return parsePropsObject(staticPropsMatch[1], constants)
  }
  
  const createContextMatch = sourceCode.match(/createComponentContext\s*\(\s*\{/)
  if (createContextMatch) {
    const braceIndex = sourceCode.indexOf('{', createContextMatch.index)
    const contextObj = extractObjectContent(sourceCode, braceIndex)
    
    if (contextObj) {
      const propsKeyMatch = contextObj.match(/props\s*:\s*\{/)
      if (propsKeyMatch) {
        const propsStartIndex = propsKeyMatch.index + propsKeyMatch[0].length - 1
        const propsObj = extractObjectContent(contextObj, propsStartIndex)
        if (propsObj) {
          return parsePropsObject(propsObj.slice(1, -1), constants)
        }
      }
    }
  }
  
  const buildPropsMatch = sourceCode.match(/buildProps\s*\(\s*\{/)
  if (buildPropsMatch) {
    const braceIndex = sourceCode.indexOf('{', buildPropsMatch.index)
    const propsObj = extractObjectContent(sourceCode, braceIndex)
    if (propsObj) {
      return parsePropsObject(propsObj.slice(1, -1), constants)
    }
  }
  
  return {}
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
  
  if (Object.keys(result).length > 0) {
    return result
  }
  
  const createContextMatch = sourceCode.match(/createComponentContext\s*\(\s*\{/)
  if (createContextMatch) {
    const braceIndex = sourceCode.indexOf('{', createContextMatch.index)
    const contextObj = extractObjectContent(sourceCode, braceIndex)
    
    if (contextObj) {
      const emitsKeyMatch = contextObj.match(/emits\s*:\s*\{/)
      if (emitsKeyMatch) {
        const emitsStartIndex = emitsKeyMatch.index + emitsKeyMatch[0].length - 1
        const emitsObj = extractObjectContent(contextObj, emitsStartIndex)
        if (emitsObj) {
          const emitContent = emitsObj.slice(1, -1)
          const contextEmitRegex = /['"]?([\w-]+)['"]?\s*:\s*\(([^)]*)\)\s*=>\s*true/g
          let contextEmitMatch
          
          while ((contextEmitMatch = contextEmitRegex.exec(emitContent)) !== null) {
            const emitName = contextEmitMatch[1]
            const params = contextEmitMatch[2]
              .split(',')
              .map(p => p.trim())
              .filter(Boolean)
            
            result[emitName] = {
              params,
              description: '',
            }
          }
        }
      }
    }
  }
  
  const emitsArrayMatch = sourceCode.match(/export\s+const\s+\w+Emits?\s*=\s*\[([^\]]*)\]/)
  if (emitsArrayMatch) {
    const emitsStr = emitsArrayMatch[1]
    const emitNames = emitsStr
      .split(',')
      .map(e => e.trim().replace(/['"]/g, ''))
      .filter(Boolean)
    
    emitNames.forEach(emitName => {
      result[emitName] = {
        params: [],
        description: '',
      }
    })
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
      const imports = parseImports(sourceCode)
      const constants = resolveConstants(contextPath, imports)
      
      props = parsePropsFromSource(sourceCode, constants)
      emits = parseEmitsFromSource(sourceCode, constants)
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