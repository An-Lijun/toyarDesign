import type { Plugin } from 'vite'

export default function bemStaticOptimization(): Plugin {
  return {
    name: 'vite-plugin-bem-static-optimization',
    enforce: 'pre',
    transform(code, id) {
      // 只处理 .vue 文件
      if (!id.endsWith('.vue')) {
        return null
      }

      let modified = false
      let result = code

      // 1. 查找 import { nm } from './context' 或 import { nm as xxx } from './context'
      const importRegex = /import\s*\{([^}]+)\}\s*from\s*['"`]([^'"`]+)['"`]/g
      let match

      while ((match = importRegex.exec(code)) !== null) {
        const imports = match[1].split(',').map(s => s.trim())
        const sourcePath = match[2]

        for (const importItem of imports) {
          // 解析导入，可能是 'nm' 或 'nm as something'
          const importParts = importItem.split(/\s+as\s+/)
          const originalName = importParts[0].trim()
          const localName = importParts[1]?.trim() || originalName

          // 检查是否是已知的 BEM 变量名（nm 或类似命名）
          if (originalName === 'nm' || originalName.endsWith('Nm') || originalName.endsWith('NS')) {
            // 从当前文件路径推断 blockName
            const blockName = guessBlockNameFromPath(id)
            if (blockName) {
              const prefix = `ty-${blockName}`
              result = replaceStaticCalls(result, localName, prefix, () => { modified = true })
              console.log(`[BEM Plugin] Replaced ${localName} with prefix ${prefix} in ${id}`)
            }
          }
        }
      }

      // 2. 处理当前文件中直接定义的 useNmSpace
      const localRegex = /(?:const|let|var)\s+(\w+)\s*=\s*useNmSpace\s*\(\s*['"`]([^'"`]+)['"`]\s*\)/g

      while ((match = localRegex.exec(code)) !== null) {
        const varName = match[1]
        const blockName = match[2]
        const prefix = `ty-${blockName}`

        result = replaceStaticCalls(result, varName, prefix, () => { modified = true })
        console.log(`[BEM Plugin] Replaced ${varName} = useNmSpace('${blockName}') in ${id}`)
      }

      if (modified) {
        return {
          code: result,
          map: null
        }
      }

      return null
    }
  }
}

// 从当前文件路径推断 blockName
function guessBlockNameFromPath(filePath: string): string | null {
  // 从路径中提取组件名
  // 例如：'.../components/button/src/button.vue' -> 'button'
  // '.../components/input/src/input.vue' -> 'input'

  const parts = filePath.split(/[\\/]/)

  // 找到 components 目录后的第一个目录名
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === 'components' && i + 1 < parts.length) {
      return parts[i + 1]
    }
  }

  // 备选：从文件名推断（去掉 .vue 后缀）
  const fileName = parts[parts.length - 1]
  if (fileName.endsWith('.vue')) {
    return fileName.replace('.vue', '')
  }

  return null
}

function replaceStaticCalls(code: string, varName: string, prefix: string, onModified: () => void): string {
  let result = code

  // 1. 替换 nm.b() 为静态字符串 'ty-block'（注意使用单引号）
  result = result.replace(
    new RegExp(`${escapeRegExp(varName)}\\.b\\(\\)`, 'g'),
    () => {
      onModified()
      return `'${prefix}'`
    }
  )

  // 2. 替换 nm.m('xxx') 或 nm.m("xxx") 为静态字符串 'ty-block--xxx'
  result = result.replace(
    new RegExp(`${escapeRegExp(varName)}\\.m\\(\\s*['"\`]([^'"\`]+)['"\`]\\s*\\)`, 'g'),
    (match, modifier) => {
      onModified()
      return `'${prefix}--${modifier}'`
    }
  )

  // 3. 替换 nm.e('xxx') 为静态字符串 'ty-block__xxx'
  result = result.replace(
    new RegExp(`${escapeRegExp(varName)}\\.e\\(\\s*['"\`]([^'"\`]+)['"\`]\\s*\\)`, 'g'),
    (match, element) => {
      onModified()
      return `'${prefix}__${element}'`
    }
  )

  // 4. 替换 nm.bem('suffix', 'el', 'mod') 为静态字符串
  result = result.replace(
    new RegExp(`${escapeRegExp(varName)}\\.bem\\(\\s*['"\`]([^'"\`]*)['"\`]\\s*,\\s*['"\`]([^'"\`]*)['"\`]\\s*,\\s*['"\`]([^'"\`]*)['"\`]\\s*\\)`, 'g'),
    (match, blockSuffix, element, modifier) => {
      onModified()
      let className = prefix
      if (blockSuffix) className += `-${blockSuffix}`
      if (element) className += `__${element}`
      if (modifier) className += `--${modifier}`
      return `'${className}'`
    }
  )

  // 5. 替换 nm.is('xxx', true) 为 'is-xxx'
  result = result.replace(
    new RegExp(`${escapeRegExp(varName)}\\.is\\(\\s*['"\`]([^'"\`]+)['"\`]\\s*,\\s*true\\s*\\)`, 'g'),
    (match, state) => {
      onModified()
      return `'is-${state}'`
    }
  )

  // 6. 替换 nm.is('xxx', false) 为 ''
  result = result.replace(
    new RegExp(`${escapeRegExp(varName)}\\.is\\(\\s*['"\`]([^'"\`]+)['"\`]\\s*,\\s*false\\s*\\)`, 'g'),
    () => {
      onModified()
      return "''"
    }
  )

  return result
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
