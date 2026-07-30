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

// 常见场景模板骨架
const SCENARIO_TEMPLATES = {
  '表单页': {
    components: ['TyForm', 'TyFormItem', 'TyInput', 'TySelect', 'TyButton', 'TyRadio', 'TyCheckBox'],
    skeleton: `<template>
  <ty-card title="表单标题">
    <ty-form :model="form" :rules="rules" layout="vertical">
      <ty-form-item label="用户名" prop="username">
        <ty-input v-model="form.username" />
      </ty-form-item>
      <ty-form-item label="邮箱" prop="email">
        <ty-input v-model="form.email" />
      </ty-form-item>
      <ty-form-item>
        <ty-button state="primary" @click="onSubmit">提交</ty-button>
        <ty-button @click="onReset">重置</ty-button>
      </ty-form-item>
    </ty-form>
  </ty-card>
</template>

<script setup>
import { reactive } from 'vue'
const form = reactive({ username: '', email: '' })
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
}
const onSubmit = () => {}
const onReset = () => {}
</script>`,
  },
  '表格页': {
    components: ['TyTable', 'TyPagination', 'TyButton', 'TySpace', 'TyInput'],
    skeleton: `<template>
  <ty-space>
    <ty-input v-model="keyword" placeholder="请输入关键词" />
    <ty-button state="primary" @click="onSearch">搜索</ty-button>
  </ty-space>
  <ty-table :data="tableData" :columns="columns" row-key="id" />
  <ty-pagination v-model:current="current" :total="total" :page-size="pageSize" />
</template>

<script setup>
import { ref } from 'vue'
const keyword = ref('')
const current = ref(1)
const total = ref(0)
const pageSize = ref(10)
const columns = [
  { title: '名称', key: 'name' },
  { title: '操作', key: 'action' }
]
const tableData = ref([])
const onSearch = () => {}
</script>`,
  },
  '弹窗表单': {
    components: ['TyDialog', 'TyForm', 'TyFormItem', 'TyInput', 'TyButton'],
    skeleton: `<template>
  <ty-button state="primary" @click="visible = true">打开弹窗</ty-button>
  <ty-dialog v-model="visible" title="编辑">
    <ty-form :model="form" :rules="rules">
      <ty-form-item label="名称" prop="name">
        <ty-input v-model="form.name" />
      </ty-form-item>
    </ty-form>
    <template #footer>
      <ty-button @click="visible = false">取消</ty-button>
      <ty-button state="primary" @click="onConfirm">确定</ty-button>
    </template>
  </ty-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'
const visible = ref(false)
const form = reactive({ name: '' })
const rules = { name: [{ required: true, message: '请输入名称', trigger: 'blur' }] }
const onConfirm = () => {}
</script>`,
  },
  '详情页': {
    components: ['TyCard', 'TyDescriptions', 'TyButton', 'TyDivider'],
    skeleton: `<template>
  <ty-page-header title="详情页" @back="$router.back" />
  <ty-card title="基本信息">
    <ty-descriptions :data="descriptionsData" :column="2" border />
  </ty-card>
</template>

<script setup>
const descriptionsData = [
  { label: '名称', value: 'Toyar Design' },
  { label: '版本', value: '1.0.0' }
]
</script>`,
  },
  '登录页': {
    components: ['TyForm', 'TyFormItem', 'TyInput', 'TyButton', 'TyCheckBox'],
    skeleton: `<template>
  <ty-card title="登录" style="width: 360px; margin: 100px auto;">
    <ty-form :model="form" :rules="rules">
      <ty-form-item prop="username">
        <ty-input v-model="form.username" placeholder="用户名" />
      </ty-form-item>
      <ty-form-item prop="password">
        <ty-input-password v-model="form.password" placeholder="密码" />
      </ty-form-item>
      <ty-form-item>
        <ty-check-box v-model="form.remember">记住我</ty-check-box>
      </ty-form-item>
      <ty-form-item>
        <ty-button state="primary" block @click="onLogin">登录</ty-button>
      </ty-form-item>
    </ty-form>
  </ty-card>
</template>

<script setup>
import { reactive } from 'vue'
const form = reactive({ username: '', password: '', remember: false })
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
const onLogin = () => {}
</script>`,
  },
}

function detectScenario(scenario) {
  const keys = Object.keys(SCENARIO_TEMPLATES)
  const lower = scenario.toLowerCase()
  for (const key of keys) {
    if (lower.includes(key.toLowerCase())) return key
  }
  if (/表单|录入|提交|填写/.test(scenario)) return '表单页'
  if (/表格|列表页|数据展示|分页/.test(scenario)) return '表格页'
  if (/弹窗|对话框|modal|抽屉.*表单/.test(scenario)) return '弹窗表单'
  if (/详情|详情页|描述/.test(scenario)) return '详情页'
  if (/登录|注册|sign|login/.test(scenario)) return '登录页'
  return null
}

/**
 * 注册 recommend_components 工具：根据场景推荐组件组合
 */
export function registerRecommendComponents(server, components) {
  server.tool(
    'recommend_components',
    '根据使用场景智能推荐组件组合。返回推荐组件列表、场景说明以及可直接参考的 template + script 骨架。',
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

      const scenarioKey = detectScenario(scenario)
      const template = scenarioKey ? SCENARIO_TEMPLATES[scenarioKey] : null

      const lines = [
        `针对场景「${scenario}」推荐以下 ${list.length} 个组件：`,
        '',
        ...list.map(({ c, reason }) =>
          `- ${c.name}（${c.id}）｜${c.category}｜${c.description || '无描述'} — ${reason}`
        ),
      ]

      if (template) {
        lines.push('')
        lines.push(`## ${scenarioKey} 典型骨架`)
        lines.push('```vue')
        lines.push(template.skeleton)
        lines.push('```')
      }

      lines.push('')
      lines.push('提示：使用 get_component_description 查看单个组件的详细 API，使用 generate_component_code 生成具体组件示例。')

      return textResult(lines.join('\n'))
    }
  )
}
