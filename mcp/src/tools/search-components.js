import { z } from 'zod'
import { scoreComponent } from '../utils/matcher.js'
import { textResult } from '../utils/result.js'

/**
 * 注册 search_components 工具：根据描述搜索匹配的组件
 */
export function registerSearchComponents(server, components) {
  server.tool(
    'search_components',
    '根据描述搜索匹配的前端组件。返回组件列表（名称 + id + 分类 + 简要说明）。',
    {
      query: z.string().describe('组件搜索描述，例如：需要一个表格组件'),
    },
    async ({ query }) => {
      const ranked = components
        .map(c => ({ c, score: scoreComponent(c, query) }))
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)

      if (ranked.length === 0) {
        return textResult(`未找到与「${query}」匹配的组件。`)
      }

      const lines = ranked.map(({ c }) =>
        `- ${c.name}（${c.id}）｜分类：${c.category}｜${c.title || c.description || '无描述'}`
      )
      return textResult(
        `找到 ${ranked.length} 个匹配组件：\n\n${lines.join('\n')}\n\n` +
        `提示：使用 get_component_description 获取某个组件的详细属性、事件和插槽。`
      )
    }
  )
}
