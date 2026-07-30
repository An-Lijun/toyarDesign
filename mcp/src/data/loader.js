import componentsData from './components.json' with { type: 'json' }

/**
 * 加载所有组件元数据
 * 数据来源：内嵌的 components.json（随 MCP 打包产物一起发布，完全自包含）
 * @returns {Array} 组件元数据数组
 */
export function loadComponents() {
  return componentsData
}
