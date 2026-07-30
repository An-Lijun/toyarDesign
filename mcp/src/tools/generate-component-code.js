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
 * 根据 requirements 中的关键词匹配枚举值
 */
function matchEnumAttrs(props, requirements) {
  const attrs = []
  for (const [key, p] of Object.entries(props)) {
    if (!p.values) continue
    for (const v of p.values) {
      if (requirements.includes(v)) {
        if (!attrs.find(a => a === key || a.startsWith(`${key}=`) || a.startsWith(`:${key}=`))) {
          attrs.push(formatAttr(key, v, p.type))
          break
        }
      }
    }
  }
  return attrs
}

/**
 * 根据 requirements 中的关键词匹配布尔属性
 */
function matchBoolAttrs(props, requirements) {
  const attrs = []
  const checks = [
    { re: /禁用|disabled/i, key: 'disabled', expr: 'disabled' },
    { re: /加载中|loading/i, key: 'loading', expr: ':loading="true"' },
    { re: /块级|block|撑满|铺满/i, key: 'block', expr: 'block' },
    { re: /只读|readonly/i, key: 'readonly', expr: 'readonly' },
    { re: /可清空|clearable/i, key: 'clearable', expr: 'clearable' },
    { re: /多选|multiple/i, key: 'multiple', expr: 'multiple' },
  ]
  for (const { re, key, expr } of checks) {
    if (re.test(requirements) && props[key]) {
      if (!attrs.find(a => a === key || a.startsWith(`${key}=`) || a.startsWith(`:${key}=`))) {
        attrs.push(expr)
      }
    }
  }
  return attrs
}

/**
 * 生成组件使用代码模板
 */
export function registerGenerateCode(server, components) {
  server.tool(
    'generate_component_code',
    '根据需求生成组件使用代码模板。基于组件 props、组合子组件与需求描述自动生成带 v-model、子组件循环、常用 props 的可运行 Vue 示例片段。',
    {
      componentName: z.string().describe('组件名称，如 button、TyInput'),
      requirements: z.string().describe('具体需求描述，例如：一个危险类型的禁用按钮，或一个带分组选项的多选选择器'),
    },
    async ({ componentName, requirements }) => {
      const c = findComponent(components, componentName)
      if (!c) {
        return textResult(`未找到组件：${componentName}`)
      }

      const props = c.props || {}
      const related = c.relatedComponents || []
      const tag = toKebab(c.name || c.id)

      // 1. 属性匹配
      const enumAttrs = matchEnumAttrs(props, requirements)
      const boolAttrs = matchBoolAttrs(props, requirements)
      const attrs = [...enumAttrs]
      for (const a of boolAttrs) {
        if (!attrs.find(x => x === a || x.startsWith(a.split('=')[0]))) {
          attrs.push(a)
        }
      }

      // 2. 判断是否为 group 包装场景（check-box / radio）
      const childTags = related.map(r => toKebab(r))
      const isGroupWrapper =
        (tag === 'ty-check-box' && childTags.includes('ty-check-box-group')) ||
        (tag === 'ty-radio' && childTags.includes('ty-radio-group'))
      const wrapperTag = isGroupWrapper
        ? (tag === 'ty-check-box' ? 'ty-check-box-group' : 'ty-radio-group')
        : null

      // 3. 是否支持 v-model
      const hasModelValue = !!props.modelValue
      let modelName = null
      if (wrapperTag) {
        modelName = tag === 'ty-check-box' ? 'checkedValues' : 'radioValue'
        // group 场景下 v-model 放在 group 上
        attrs.push(`v-model="${modelName}"`)
      } else if (hasModelValue) {
        modelName = `${c.id.replace(/-/g, '')}Value`
        const existing = attrs.find(a => a.startsWith('v-model') || a.startsWith(':modelValue'))
        if (!existing) {
          attrs.push(`v-model="${modelName}"`)
        }
      }

      // 4. 生成子组件 / 默认内容
      const dataName = `${c.id.replace(/-/g, '')}Options`
      const hasDefaultSlot = (c.slots || []).includes('default')
      let slotLines = []

      // 4.1 select 选项/分组
      if (tag === 'ty-select') {
        const optionTag = childTags.find(t => t.includes('select-option')) || 'ty-select-option'
        const groupTag = childTags.find(t => t.includes('select-group')) || 'ty-select-group'
        if (childTags.includes(groupTag)) {
          slotLines = [
            `  <${groupTag} label="分组一">`,
            `    <${optionTag} v-for="item in ${dataName}" :key="item.value" :value="item.value" :label="item.label" />`,
            `  </${groupTag}>`,
            `  <${optionTag} value="other" label="其他" />`,
          ]
        } else {
          slotLines = [
            `  <${optionTag} v-for="item in ${dataName}" :key="item.value" :value="item.value" :label="item.label" />`,
          ]
        }
      }
      // 4.2 check-box / radio 分组
      else if (wrapperTag) {
        slotLines = [
          `  <${tag} v-for="item in ${dataName}" :key="item.value" :value="item.value">{{ item.label }}</${tag}>`,
        ]
      }
      // 4.3 默认插槽兜底
      else if (hasDefaultSlot) {
        slotLines = [`  ${c.name} 示例`]
      }

      // 5. 组装 template
      const attrStr = attrs.length ? ' ' + attrs.join(' ') : ''
      const isVoid = slotLines.length === 0 && (c.slots || []).length === 0
      let templateCode
      if (isVoid) {
        templateCode = `<${tag}${attrStr} />`
      } else if (wrapperTag) {
        templateCode = [
          `<${wrapperTag}${attrStr}>`,
          ...slotLines,
          `</${wrapperTag}>`,
        ].join('\n')
      } else if (slotLines.length === 1 && !slotLines[0].startsWith('  <')) {
        templateCode = `<${tag}${attrStr}>${slotLines[0].trim()}</${tag}>`
      } else {
        templateCode = [
          `<${tag}${attrStr}>`,
          ...slotLines,
          `</${tag}>`,
        ].join('\n')
      }

      // 6. 组装 script 数据
      const scriptLines = []
      const needsScript = modelName || slotLines.some(l => l.includes('v-for'))
      if (needsScript) {
        scriptLines.push("import { ref } from 'vue'")
        scriptLines.push('')
        if (modelName) {
          const isArray =
            (wrapperTag && wrapperTag === 'ty-check-box-group') ||
            (props.modelValue && props.modelValue.type && props.modelValue.type.includes('array'))
          const defaultValue = isArray ? '[]' : "''"
          scriptLines.push(`const ${modelName} = ref(${defaultValue})`)
        }
        if (slotLines.some(l => l.includes('v-for'))) {
          scriptLines.push(`const ${dataName} = ref([`)
          scriptLines.push("  { value: 'a', label: '选项 A' },")
          scriptLines.push("  { value: 'b', label: '选项 B' },")
          scriptLines.push("  { value: 'c', label: '选项 C' },")
          scriptLines.push('])')
        }
      }
      if (/点击|submit|handle|提交|确认|取消|搜索/.test(requirements)) {
        if (!scriptLines.includes("import { ref } from 'vue'") && scriptLines.length === 0) {
          scriptLines.push("import { ref } from 'vue'")
          scriptLines.push('')
        }
        if (!scriptLines.some(l => l.includes('handleClick'))) {
          scriptLines.push('const handleClick = () => {')
          scriptLines.push('  // TODO: 处理点击事件')
          scriptLines.push('}')
        }
      }

      const lines = [
        `// 组件：${c.name}（${c.id}）`,
        `// 分类：${c.category}`,
        `// 需求：${requirements}`,
        `// 说明：${c.description || '基于组件 props 生成的基础用法'}`,
      ]
      if (related.length) {
        lines.push(`// 组合子组件：${related.join(' / ')}`)
      }
      lines.push('')
      lines.push('```vue')
      lines.push('<template>')
      lines.push(templateCode.split('\n').map(l => `  ${l}`).join('\n'))
      lines.push('</template>')
      if (scriptLines.length) {
        lines.push('')
        lines.push('<script setup>')
        lines.push(...scriptLines)
        lines.push('</script>')
      }
      lines.push('```')

      return textResult(lines.join('\n'))
    }
  )
}
