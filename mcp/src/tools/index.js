import { registerSearchComponents } from './search-components.js'
import { registerGetDescription } from './get-component-description.js'
import { registerRecommendComponents } from './recommend-components.js'
import { registerGenerateCode } from './generate-component-code.js'

/**
 * 注册所有 MCP 工具
 * @param {import('@modelcontextprotocol/sdk/server/mcp.js').McpServer} server
 * @param {Array} components - 组件元数据数组
 */
export function registerTools(server, components) {
  registerSearchComponents(server, components)
  registerGetDescription(server, components)
  registerRecommendComponents(server, components)
  registerGenerateCode(server, components)
}
