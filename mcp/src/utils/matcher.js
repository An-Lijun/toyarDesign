/**
 * 组件名称转 kebab-case 标签（TyButton → ty-button）
 * @param {string} name - 组件名称
 * @returns {string}
 */
export function toKebab(name) {
  return String(name || '')
    .replace(/^Ty/i, 'ty')
    .replace(/([A-Z])/g, (_, c) => '-' + c.toLowerCase())
    .replace(/^-/, '')
    .replace(/-+/g, '-')
}

/**
 * 计算组件与查询的相关度评分
 * @param {Object} component - 组件元数据
 * @param {string} query - 查询关键词
 * @returns {number} 评分（越高越相关）
 */
export function scoreComponent(component, query) {
  const q = String(query).toLowerCase().trim()
  if (!q) return 0
  const tokens = q.split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return 0

  const fields = [
    component.id,
    component.name,
    component.title,
    component.description,
    component.category,
    ...Object.keys(component.props || {}),
    ...Object.values(component.props || {}).map(p => p && p.description).filter(Boolean),
    ...Object.keys(component.emits || {}),
    ...(component.slots || []),
  ].map(s => String(s).toLowerCase())

  let score = 0
  for (const token of tokens) {
    for (const f of fields) {
      if (!f) continue
      if (f === token) score += 3
      else if (f.includes(token)) score += 1
    }
  }
  return score
}

/**
 * 按名称或 id 查找组件（支持模糊匹配）
 * @param {Array} components - 组件数组
 * @param {string} name - 组件名称（id 或 name）
 * @returns {Object|null}
 */
export function findComponent(components, name) {
  const key = String(name).toLowerCase().trim()
  // 精确匹配 id / name
  let found = components.find(c => c.id === key || (c.id && c.id.toLowerCase() === key))
  if (!found) found = components.find(c => c.name && c.name.toLowerCase() === key)
  // 去掉 Ty 前缀匹配
  if (!found) {
    const noPrefix = key.replace(/^ty/, '')
    found = components.find(c => c.name && c.name.toLowerCase().replace(/^ty/, '') === noPrefix)
  }
  // 包含匹配
  if (!found) {
    found = components.find(c => c.id.includes(key) || (c.name && c.name.toLowerCase().includes(key)))
  }
  return found || null
}
