import { z } from 'zod'
import { findComponent } from '../utils/matcher.js'
import { textResult } from '../utils/result.js'

/**
 * 注册 get_component_relations 工具：查询组件的配套子组件及关系索引
 */
export function registerGetComponentRelations(server, components) {
  server.tool(
    'get_component_relations',
    '查询组件的组合子组件（如 TySelect 的 TySelectOption / TySelectGroup）及相互关系，一次调用即可拿到主组件 + 配套子组件。',
    {
      componentName: z.string().describe('组件名称，如 select、TySelect'),
    },
    async ({ componentName }) => {
      const c = findComponent(components, componentName)
      if (!c) {
        return textResult(JSON.stringify({ error: `未找到组件：${componentName}` }, null, 2))
      }

      const related = c.relatedComponents || []
      const relatedDetails = related
        .map(name => {
          const found = components.find(x => x.name === name)
          return found
            ? {
                id: found.id,
                name: found.name,
                category: found.category,
                description: found.description,
                docPath: found.docPath,
              }
            : { name, note: '该子组件暂无独立元数据' }
        })

      const result = {
        id: c.id,
        name: c.name,
        category: c.category,
        description: c.description,
        docPath: c.docPath,
        relatedComponents: relatedDetails,
        examples: c.examples || [],
      }

      return textResult(JSON.stringify(result, null, 2))
    }
  )
}
