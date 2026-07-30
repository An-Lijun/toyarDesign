import { z } from 'zod'
import { scoreComponent } from '../utils/matcher.js'
import { textResult } from '../utils/result.js'

// 分类关键词映射，用于场景推荐
const CATEGORY_KEYWORDS = {
  '表单组件': ['表单', '输入', '选择', '提交', '填写', '录入', '表单页', '登记', '注册', '登录'],
  '基础组件': ['按钮', '按钮组', '分割', '水印', '基础', '回到顶部', '全局配置'],
  '展示组件': ['展示', '列表', '表格', '卡片', '数据', '展示页', '详情', '日历', '头像', '徽标', '骨架屏', '菜单'],
  '反馈组件': ['弹窗', '提示', '消息', '通知', '反馈', '加载', '确认', '抽屉', '气泡', '结果'],
  '布局组件': ['布局', '栅格', '容器', '间距', '页面结构', '行', '列'],
  '容器组件': ['卡片', '折叠', '标签页', '内容容器', '手风琴'],
}

/**
 * 注册 recommend_components 工具：根据场景推荐组件组合
 */
export function registerRecommendComponents(server, components) {
  server.tool(
    'recommend_components',
    '根据使用场景智能推荐组件组合。返回推荐组件及其在场景中的作用。',
    {
      scenario: z.string().describe('使用场景描述，例如：构建一个数据录入表单页'),
    },
    async ({ scenario }) => {
      // 1. 按分类关键词匹配推荐分类
      const matchedCategories = new Set()
      for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
        if (keywords.some(kw => scenario.includes(kw))) {
          matchedCategories.add(cat)
        }
      }

      // 2. 组合推荐：分类匹配的组件优先，再补充关键词匹配组件
      const recommended = new Map()
      for (const cat of matchedCategories) {
        for (const c of components) {
          if (c.category === cat) {
            recommended.set(c.id, { c, reason: `属于「${cat}」，适配此场景` })
          }
        }
      }

      const ranked = components
        .map(c => ({ c, score: scoreComponent(c, scenario) }))
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score)
      for (const { c } of ranked) {
        if (!recommended.has(c.id)) {
          recommended.set(c.id, { c, reason: '关键词匹配' })
        }
      }

      const list = [...recommended.values()].slice(0, 8)

      if (list.length === 0) {
        return textResult(`暂未找到适配「${scenario}」的组件推荐。`)
      }

      const lines = list.map(({ c, reason }) =>
        `- ${c.name}（${c.id}）｜${c.category}｜${c.title || c.description || '无描述'} — ${reason}`
      )
      return textResult(
        `针对场景「${scenario}」推荐以下 ${list.length} 个组件：\n\n${lines.join('\n')}\n\n` +
        `提示：使用 get_component_description 查看单个组件的详细 API。`
      )
    }
  )
}
