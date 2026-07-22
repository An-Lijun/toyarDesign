/**
 * 组件元数据生成脚本
 * 
 * 功能：自动扫描 src/package/components 下的所有组件，从 context.ts 和 .vue 文件中提取
 *       props、emits、slots 等信息，生成 metadata.json 和 component-manifest.json
 * 
 * 支持的组件定义模式：
 * 1. 传统模式：export const staticProps = { ... }
 * 2. createComponentContext 模式：createComponentContext({ props: { ... }, emits: { ... } })
 * 3. buildProps 模式：buildProps({ ... }) + export const xxxEmits = ['event1', 'event2']
 * 
 * 使用方式：
 * - node scripts/generate-metadata.js          # 为所有组件生成元数据
 * - node scripts/generate-metadata.js button    # 为指定组件生成元数据
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件的绝对路径
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 组件目录路径（包含所有组件的文件夹）
const COMPONENTS_DIR = path.join(__dirname, '../src/package/components')
// 输出目录路径（生成的 manifest 文件存放位置）
const OUTPUT_DIR = path.join(__dirname, '../dist')

/**
 * Vue Prop 类型映射表
 * 将 TypeScript 类型名称转换为标准化的类型字符串
 */
const typeMap = {
  String: 'string',
  Number: 'number',
  Boolean: 'boolean',
  Object: 'object',
  Array: 'array',
  Function: 'function',
  Element: 'HTMLElement',
}

/**
 * 解析 sourceCode 中的 import 语句
 * 
 * @param {string} sourceCode - context.ts 的源代码内容
 * @returns {Array} - 解析结果数组，每项包含 { modulePath, names }
 * 
 * @example
 * // 输入：import { TY_STATE, TY_SIZE } from '../../../constant'
 * // 输出：[{ modulePath: '../../../constant', names: ['TY_STATE', 'TY_SIZE'] }]
 */
function parseImports(sourceCode) {
  const imports = []
  // 正则匹配 import { xxx, yyy } from 'path' 格式
  const importRegex = /import\s+(\{[^}]+\})\s+from\s+['"]([^'"]+)['"]/g
  let match
  
  while ((match = importRegex.exec(sourceCode)) !== null) {
    // 提取花括号内的变量名，去掉花括号并分割
    const namedImports = match[1]
      .replace(/[{}]/g, '')
      .split(',')
      .map(i => i.trim())
      .filter(Boolean)
    
    imports.push({
      modulePath: match[2],    // 模块路径
      names: namedImports      // 导入的变量名数组
    })
  }
  
  return imports
}

/**
 * 根据 import 语句解析并获取常量的实际值
 * 
 * @param {string} filePath - 当前 context.ts 文件的绝对路径
 * @param {Array} imports - parseImports 返回的导入信息数组
 * @returns {Object} - 常量名到实际值的映射表
 * 
 * @example
 * // 输入：filePath = '.../button/src/context.ts', imports = [{ modulePath: '../../../constant', names: ['TY_STATE'] }]
 * // 输出：{ TY_STATE: ['primary', 'success', 'warning', 'danger'] }
 */
function resolveConstants(filePath, imports) {
  const constants = {}
  
  for (const imp of imports) {
    // 解析模块的绝对路径（支持 .ts 文件和目录）
    const resolvedPath = path.resolve(path.dirname(filePath), imp.modulePath)
    const resolvedTsPath = resolvedPath.endsWith('.ts') ? resolvedPath : `${resolvedPath}.ts`
    const resolvedIndexPath = path.join(resolvedPath, 'index.ts')
    
    // 按优先级查找文件：.ts 文件 → 目录下的 index.ts → 原始路径
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
        
        // 遍历每个导入的常量名，提取其值
        for (const name of imp.names) {
          // 正则匹配 export const NAME = [...] 格式
          const constRegex = new RegExp(`export\\s+const\\s+${name}\\s*=\\s*(\\[[^\\]]+\\])`)
          const constMatch = content.match(constRegex)
          if (constMatch) {
            try {
              // 将单引号替换为双引号后解析为 JSON 数组
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

/**
 * 解析 props 对象的内容，提取每个 prop 的配置
 * 
 * @param {string} propsContent - props 对象内部的内容（去掉外层花括号）
 * @param {Object} constants - 常量映射表，用于解析 values: TY_STATE 这类引用
 * @returns {Object} - 解析后的 props 配置对象
 * 
 * @example
 * // 输入："tag: { type: String, default: 'div' }, offsetTop: { type: Number, default: 0 }"
 * // 输出：{ tag: { type: 'string', default: 'div', ... }, offsetTop: { type: 'number', default: 0, ... } }
 */
function parsePropsObject(propsContent, constants = {}) {
  const result = {}
  const braceStack = []       // 花括号层级栈，用于处理嵌套对象
  let currentPropName = null  // 当前正在解析的 prop 名称
  let propBuffer = ''         // 当前 prop 的配置内容缓冲
  
  for (let i = 0; i < propsContent.length; i++) {
    const char = propsContent[i]
    
    if (char === '{') {
      braceStack.push('{')
    } else if (char === '}') {
      braceStack.pop()
      
      // 当花括号层级回到 0 且有当前 prop 名称时，说明一个 prop 配置解析完成
      if (braceStack.length === 0 && currentPropName) {
        const propConfig = parsePropConfig(propBuffer, constants)
        result[currentPropName] = propConfig
        currentPropName = null
        propBuffer = ''
      }
    } else if (braceStack.length === 0 && !currentPropName) {
      // 在顶层且没有当前 prop 名称时，尝试匹配 prop 名称
      const propNameMatch = propsContent.slice(i).match(/^['"]?([\w-]+)['"]?\s*:\s*\{/)
      if (propNameMatch) {
        currentPropName = propNameMatch[1]
        i += propNameMatch[0].length - 1  // 跳过已匹配的部分
        braceStack.push('{')
      }
    } else if (braceStack.length === 1 && currentPropName) {
      // 在第一层花括号内且有当前 prop 名称时，收集配置内容
      propBuffer += char
    }
  }
  
  return result
}

/**
 * 解析单个 prop 的配置字符串
 * 
 * @param {string} configStr - prop 的配置内容（如 "type: String, default: 'div', description: '自定义标签'"）
 * @param {Object} constants - 常量映射表
 * @returns {Object} - 解析后的 prop 配置对象
 */
function parsePropConfig(configStr, constants = {}) {
  // 初始化 prop 配置对象，只包含必要字段
  const config = {
    type: 'unknown',      // 类型
    default: null,        // 默认值
    required: false,      // 是否必填
    description: '',      // 描述
  }
  
  // 解析 type 字段（单个类型，如 type: String）
  const typeMatch = configStr.match(/type:\s*(\w+)/)
  if (typeMatch) {
    config.type = typeMap[typeMatch[1]] || typeMatch[1].toLowerCase()
  }
  
  // 解析 type 字段（数组类型，如 type: [String, Number]）
  const arrayTypeMatch = configStr.match(/type:\s*\[([^\]]+)\]/)
  if (arrayTypeMatch) {
    const types = arrayTypeMatch[1]
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
      .map(t => typeMap[t] || t.toLowerCase())
    config.type = types.join(' | ')  // 合并为 "string | number" 格式
  }
  
  // 解析 values 字段（内联数组，如 values: ['primary', 'success']）
  const valuesMatch = configStr.match(/values:\s*(\[[^\]]+\])/)
  if (valuesMatch) {
    try {
      const parsedValues = JSON.parse(valuesMatch[1].replace(/'/g, '"'))
      // 只有当数组非空时才添加 values 字段
      if (parsedValues && parsedValues.length > 0) {
        config.values = parsedValues
      }
    } catch (e) {
      // 解析失败时忽略
    }
  } else {
    // 解析 values 字段（常量引用，如 values: TY_STATE）
    const valuesConstMatch = configStr.match(/values:\s*([\w]+)/)
    if (valuesConstMatch && constants[valuesConstMatch[1]]) {
      const constValues = constants[valuesConstMatch[1]]
      // 只有当数组非空时才添加 values 字段
      if (constValues && constValues.length > 0) {
        config.values = constValues
      }
    }
  }
  
  // 解析 description 字段（如 description: '自定义标签'）
  const descriptionMatch = configStr.match(/description:\s*['"`]([^'"`]+)['"`]/)
  if (descriptionMatch) {
    config.description = descriptionMatch[1]
  }
  
  // 解析 default 字段（使用 [^,\n]+ 避免贪婪匹配到后面的字段）
  const defaultMatch = configStr.match(/default:\s*([^,\n]+)/)
  if (defaultMatch) {
    config.default = parseDefaultValue(defaultMatch[1].trim())
  }
  
  // 解析 required 字段
  const requiredMatch = configStr.match(/required:\s*(true|false)/)
  if (requiredMatch) {
    config.required = requiredMatch[1] === 'true'
  }
  
  return config
}

/**
 * 解析 default 值的字符串表示为实际值
 * 
 * @param {string} value - default 值的字符串（如 "'div'", "0", "true", "null"）
 * @returns {*} - 解析后的实际值
 */
function parseDefaultValue(value) {
  // 处理布尔值
  if (value === 'true') return true
  if (value === 'false') return false
  
  // 处理 null/undefined
  if (value === 'undefined') return null
  if (value === 'null') return null
  
  // 处理数字
  if (!isNaN(value)) return Number(value)
  
  // 处理字符串（使用非贪婪匹配 .*?）
  const stringMatch = value.match(/^['"](.*?)['"]/)
  if (stringMatch) {
    return stringMatch[1]
  }
  
  // 处理末尾有逗号的情况（如 "0,"）
  if (value.endsWith(',')) {
    return parseDefaultValue(value.slice(0, -1).trim())
  }
  
  return null
}

/**
 * 从 sourceCode 中提取指定位置开始的完整对象内容（包含配对的花括号）
 * 
 * @param {string} sourceCode - 源代码内容
 * @param {number} startIndex - 起始位置（指向开始的 '{'）
 * @returns {string} - 完整的对象字符串（包含外层花括号）
 * 
 * @example
 * // 输入：sourceCode = "{ name: 'affix', props: { tag: 'div' } }", startIndex = 0
 * // 输出："{ name: 'affix', props: { tag: 'div' } }"
 */
function extractObjectContent(sourceCode, startIndex) {
  let braceCount = 1        // 花括号计数，初始为 1（因为 startIndex 已经是 '{'）
  let inString = false      // 是否在字符串内
  let stringChar = ''       // 当前字符串的引号类型
  
  for (let i = startIndex + 1; i < sourceCode.length; i++) {
    const char = sourceCode[i]
    
    // 处理字符串开始
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = true
      stringChar = char
    }
    // 处理字符串结束（排除转义的引号）
    else if (inString && char === stringChar && sourceCode[i - 1] !== '\\') {
      inString = false
    }
    // 处理花括号（不在字符串内时）
    else if (!inString) {
      if (char === '{') {
        braceCount++
      } else if (char === '}') {
        braceCount--
        // 当计数回到 0 时，说明找到了匹配的结束花括号
        if (braceCount === 0) {
          return sourceCode.slice(startIndex, i + 1)
        }
      }
    }
  }
  return ''  // 未找到匹配的花括号
}

/**
 * 从 sourceCode 中解析 props 配置
 * 依次尝试三种模式：staticProps → createComponentContext → buildProps
 * 
 * @param {string} sourceCode - context.ts 的源代码内容
 * @param {Object} constants - 常量映射表
 * @returns {Object} - 解析后的 props 对象
 */
function parsePropsFromSource(sourceCode, constants = {}) {
  // 模式1：传统模式 export const staticProps = { ... }
  const staticPropsMatch = sourceCode.match(/export\s+const\s+staticProps\s*=\s*\{([\s\S]*?)\}(?=\s*export|$)/)
  if (staticPropsMatch) {
    return parsePropsObject(staticPropsMatch[1], constants)
  }
  
  // 模式2：createComponentContext 模式
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
  
  // 模式3：buildProps 模式
  const buildPropsMatch = sourceCode.match(/buildProps\s*\(\s*\{/)
  if (buildPropsMatch) {
    const braceIndex = sourceCode.indexOf('{', buildPropsMatch.index)
    const propsObj = extractObjectContent(sourceCode, braceIndex)
    if (propsObj) {
      return parsePropsObject(propsObj.slice(1, -1), constants)
    }
  }
  
  return {}  // 未匹配到任何模式
}

/**
 * 从 sourceCode 中解析 emits 配置
 * 依次尝试三种模式：对象形式 → createComponentContext → 数组形式
 * 
 * @param {string} sourceCode - context.ts 的源代码内容
 * @returns {Object} - 解析后的 emits 对象
 */
function parseEmitsFromSource(sourceCode) {
  const result = {}
  
  // 模式1：对象形式（如 click: (event) => true）
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
  
  // 模式2：createComponentContext 模式
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
  
  // 模式3：数组形式（如 export const inputEmits = ['blur', 'focus']）
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

/**
 * 从 Vue 文件中提取 slots 信息
 * 
 * @param {string} vueFilePath - .vue 文件的路径
 * @returns {Array} - slot 名称数组
 * 
 * @example
 * // 输入：<slot /> <slot name="header" /> <slot name="footer" />
 * // 输出：['default', 'header', 'footer']
 */
function extractSlotsFromVueFile(vueFilePath) {
  const content = fs.readFileSync(vueFilePath, 'utf-8')
  // 正则匹配 <slot> 和 <slot name="xxx" />
  const slotRegex = /<slot\s*(?:name="([^"]+)")?\s*\/?>/g
  const slots = []
  let match
  while ((match = slotRegex.exec(content)) !== null) {
    const slotName = match[1] || 'default'  // 没有 name 属性的 slot 默认为 default
    if (!slots.includes(slotName)) {
      slots.push(slotName)
    }
  }
  return slots
}

/**
 * 从 Vue 文件中提取组件名称（从 defineOptions 中读取）
 * 
 * @param {string} vueFilePath - .vue 文件的路径
 * @returns {string|null} - 组件名称或 null
 * 
 * @example
 * // 输入：defineOptions({ name: 'TyButton' })
 * // 输出：'TyButton'
 */
function extractComponentNameFromVueFile(vueFilePath) {
  const content = fs.readFileSync(vueFilePath, 'utf-8')
  const nameMatch = content.match(/defineOptions\(\s*\{[^}]*name:\s*["']([^"']+)["'][^}]*\}\s*\)/)
  return nameMatch ? nameMatch[1] : null
}

/**
 * 生成单个组件的元数据
 * 
 * @param {string} componentName - 组件名称（目录名）
 * @returns {Object|null} - 组件元数据对象或 null
 */
function generateComponentMetadata(componentName) {
  // 构建组件目录路径
  const componentDir = path.join(COMPONENTS_DIR, componentName)
  const srcDir = path.join(componentDir, 'src')
  
  // 检查组件目录是否存在
  if (!fs.existsSync(componentDir)) {
    console.error(`组件目录不存在: ${componentDir}`)
    return null
  }

  // 构建 context.ts 和 .vue 文件路径
  const contextPath = path.join(srcDir, 'context.ts')
  const vueFilePath = path.join(srcDir, `${componentName}.vue`)
  
  let props = {}
  let emits = {}
  
  // 如果存在 context.ts，解析 props 和 emits
  if (fs.existsSync(contextPath)) {
    try {
      const sourceCode = fs.readFileSync(contextPath, 'utf-8')
      // 解析 imports 并获取常量值
      const imports = parseImports(sourceCode)
      const constants = resolveConstants(contextPath, imports)
      
      // 解析 props 和 emits
      props = parsePropsFromSource(sourceCode, constants)
      emits = parseEmitsFromSource(sourceCode, constants)
    } catch (e) {
      console.warn(`解析 context.ts 失败: ${contextPath}`, e.message)
    }
  }

  // 从 .vue 文件中提取 slots 和组件名称
  const slots = fs.existsSync(vueFilePath) ? extractSlotsFromVueFile(vueFilePath) : []
  const componentNameFromVue = fs.existsSync(vueFilePath) ? extractComponentNameFromVueFile(vueFilePath) : null
  
  // 构建元数据对象
  const metadata = {
    id: componentName.toLowerCase(),                           // 组件 ID（小写）
    name: componentNameFromVue || `Ty${componentName.charAt(0).toUpperCase() + componentName.slice(1)}`,  // 组件名称
    category: 'unknown',                                      // 分类（待完善）
    description: '',                                          // 组件描述（待完善）
    props,                                                    // 属性配置
    emits,                                                    // 事件配置
    slots,                                                    // 插槽列表
    examples: [],                                             // 使用示例（待完善）
    capabilities: [],                                         // 功能特性（待完善）
    useCases: [],                                             // 使用场景（待完善）
  }

  return metadata
}

/**
 * 为所有组件生成元数据并输出 manifest 文件
 * 
 * @returns {Object} - manifest 对象
 */
function generateManifest() {
  const components = []
  // 读取组件目录下的所有子目录
  const entries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true })
  
  console.log('🚀 开始为所有组件生成元数据...')
  console.log('='.repeat(80))
  
  let successCount = 0
  let failCount = 0
  
  for (const entry of entries) {
    if (entry.isDirectory()) {
      try {
        // 为每个组件生成元数据
        const metadata = generateComponentMetadata(entry.name)
        if (metadata) {
          components.push(metadata)
          
          // 将元数据写入组件目录下的 metadata.json
          const outputPath = path.join(COMPONENTS_DIR, entry.name, 'metadata.json')
          fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2))
          
          // 打印统计信息
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
  
  // 构建 manifest 对象
  const manifest = {
    version: '1.0.0',                    // 版本号
    hash: Date.now().toString(36),       // 哈希值（用于缓存）
    components,                          // 所有组件的元数据数组
    generatedAt: new Date().toISOString(), // 生成时间
  }

  // 确保输出目录存在
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true })
  }

  // 将 manifest 写入 dist 目录
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'component-manifest.json'),
    JSON.stringify(manifest, null, 2)
  )

  console.log(`\n📦 component-manifest.json 已生成，共 ${components.length} 个组件`)
  console.log(`✅ 成功: ${successCount} 个`)
  console.log(`❌ 失败: ${failCount} 个`)
  return manifest
}

/**
 * 为单个组件生成元数据
 * 
 * @param {string} componentName - 组件名称
 * @returns {Object|null} - 组件元数据对象或 null
 */
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

// 导出函数（供其他模块使用）
export { generateManifest, generateSingleMetadata }

// 命令行执行入口
if (process.argv[1] === __filename) {
  const componentName = process.argv[2]
  if (componentName) {
    // 为指定组件生成元数据
    generateSingleMetadata(componentName)
  } else {
    // 为所有组件生成元数据
    generateManifest()
  }
}