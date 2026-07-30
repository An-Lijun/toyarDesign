import fs from 'node:fs'
import path from 'node:path'

/**
 * 加载所有组件元数据（单一数据源：metadata.json）
 * @param {string} componentsDir - 组件目录路径
 * @returns {Array} 组件元数据数组
 */
export function loadComponents(componentsDir) {
  const list = []

  if (!fs.existsSync(componentsDir)) {
    console.error(`[toyar-mcp] 组件目录不存在: ${componentsDir}`)
    return list
  }

  const entries = fs.readdirSync(componentsDir, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const metaPath = path.join(componentsDir, entry.name, 'metadata.json')
    if (!fs.existsSync(metaPath)) continue
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'))
      list.push(meta)
    } catch (e) {
      console.error(`[toyar-mcp] 解析失败 ${metaPath}: ${e.message}`)
    }
  }
  return list
}
