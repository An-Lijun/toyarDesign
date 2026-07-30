import { z } from 'zod'
import { findComponent, toKebab } from '../utils/matcher.js'
import { textResult } from '../utils/result.js'

/**
 * 格式化属性字符串
 */
function formatAttr(key, value, type) {
  if (type === 'boolean') {
    return value === true ? key : `:${key}="${value}"`
  }
  if (type === 'number') {
    return `:${key}="${value}"`
  }
  return `${key}="${value}"`
}

/**
 * 注册 generate_component_code 工具：根据需求生成组件使用代码模板
 */
export function registerGenerateCode(server, components) {
  server.tool(
    'generate_component_code',
    '根据需求生成组件使用代码模板。基于组件 props 与需求描述自动生成基础用法示例。',
    {
      componentName: z.string().describe('组件名称，如 button、TyInput'),
      requirements: z.string().describe('具体需求描述，例如：一个危险类型的禁用按钮'),
    },
    async ({ componentName, requirements }) => {
      const c = findComponent(components, componentName)
      if (!c) {
        return textResult(`未找到组件：${componentName}`)
      }

      const props = c.props || {}
      const attrs = []

      // 优先匹配枚举值（values）
      for (const [key, p] of Object.entries(props)) {
        if (!p.values) continue
        for (const v of p.values) {
          if (requirements.includes(v)) {
            // 避免重复添加
            if (!attrs.find(a => a.startsWith(key) || a.startsWith(`${key}`))) {
              attrs.push(formatAttr(key, v, p.type))
              break
            }
          }
        }
      }

      // 通用布尔属性关键词匹配
      if (/禁用|disabled/i.test(requirements) && props.disabled) {
        if (!attrs.find(a => a === 'disabled' || a.startsWith('disabled'))) {
          attrs.push('disabled')
        }
      }
      if (/加载中|loading/i.test(requirements) && props.loading) {
        if (!attrs.find(a => a.startsWith('loading'))) {
          attrs.push(':loading="true"')
        }
      }
      if (/块级|block|撑满|铺满/i.test(requirements) && props.block) {
        if (!attrs.find(a => a.startsWith('block'))) {
          attrs.push('block')
        }
      }
      if (/只读|readonly/i.test(requirements) && props.readonly) {
        attrs.push('readonly')
      }

      // 默认插槽内容
      const hasDefaultSlot = (c.slots || []).includes('default')
      const slotContent = hasDefaultSlot ? `${c.id} 示例` : ''

      const tag = toKebab(c.name || c.id)
      const attrStr = attrs.length ? ' ' + attrs.join(' ') : ''
      const isVoid = !slotContent && (c.slots || []).length === 0

      const code = isVoid
        ? `<${tag}${attrStr} />`
        : `<${tag}${attrStr}>${slotContent}</${tag}>`

      const lines = [
        `// 组件：${c.name}（${c.id}）`,
        `// 分类：${c.category}`,
        `// 需求：${requirements}`,
        `// 说明：${c.title || c.description || '基于组件 props 生成的基础用法'}`,
        '',
        '```vue',
        '<template>',
        `  ${code}`,
        '</template>',
        '',
        '<script setup>',
        `import { ${c.name} } from 'toyar-design'`,
        '</script>',
        '```',
      ]

      return textResult(lines.join('\n'))
    }
  )
}
