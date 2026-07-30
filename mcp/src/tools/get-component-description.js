import { z } from 'zod'
import { findComponent } from '../utils/matcher.js'
import { textResult } from '../utils/result.js'

/**
 * 注册 get_component_description 工具：返回组件完整元数据
 */
export function registerGetDescription(server, components) {
  server.tool(
    'get_component_description',
    '获取组件的详细说明、属性（props）、事件（emits）和插槽（slots）。',
    {
      componentName: z.string().describe('组件名称，如 button、TyButton、input-number'),
    },
    async ({ componentName }) => {
      const c = findComponent(components, componentName)
      if (!c) {
        return textResult(`未找到组件：${componentName}`)
      }

      const parts = []
      parts.push(`# ${c.name}（${c.id}）`)
      parts.push(`分类：${c.category}`)
      if (c.title || c.description) parts.push(`说明：${c.title || c.description}`)
      if (c.docPath) parts.push(`文档：${c.docPath}`)

      // Props
      const propKeys = Object.keys(c.props || {})
      parts.push(`\n## Props（${propKeys.length}）`)
      if (propKeys.length === 0) {
        parts.push('无')
      } else {
        for (const k of propKeys) {
          const p = c.props[k] || {}
          const req = p.required ? '必填' : '可选'
          const def = (p.default !== null && p.default !== undefined)
            ? `，默认：${JSON.stringify(p.default)}`
            : ''
          const vals = p.values ? `，可选值：${p.values.join(' | ')}` : ''
          parts.push(`- ${k}：${p.type}（${req}${def}${vals}）${p.description ? ' — ' + p.description : ''}`)
        }
      }

      // Emits
      const emitKeys = Object.keys(c.emits || {})
      parts.push(`\n## Emits（${emitKeys.length}）`)
      if (emitKeys.length === 0) {
        parts.push('无')
      } else {
        for (const k of emitKeys) {
          const e = c.emits[k] || {}
          const params = e.params && e.params.length ? `，参数：${e.params.join(', ')}` : ''
          parts.push(`- ${k}${params}${e.description ? ' — ' + e.description : ''}`)
        }
      }

      // Slots
      parts.push(`\n## Slots`)
      parts.push((c.slots && c.slots.length) ? c.slots.map(s => `- ${s}`).join('\n') : '无')

      return textResult(parts.join('\n'))
    }
  )
}
