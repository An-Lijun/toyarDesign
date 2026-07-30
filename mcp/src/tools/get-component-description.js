import { z } from 'zod'
import { findComponent } from '../utils/matcher.js'
import { textResult } from '../utils/result.js'

/**
 * 注册 get_component_description 工具：返回组件完整元数据（JSON 格式）
 */
export function registerGetDescription(server, components) {
  server.tool(
    'get_component_description',
    '获取组件的详细说明、属性（props）、事件（emits）、插槽（slots）、组合子组件（relatedComponents）及使用示例（examples）。',
    {
      componentName: z.string().describe('组件名称，如 button、TyButton、input-number'),
    },
    async ({ componentName }) => {
      const c = findComponent(components, componentName)
      if (!c) {
        return textResult(JSON.stringify({ error: `未找到组件：${componentName}` }, null, 2))
      }

      return textResult(JSON.stringify(c, null, 2))
    }
  )
}
