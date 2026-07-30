#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { loadComponents } from './data/loader.js'
import { registerTools } from './tools/index.js'

/**
 * 创建并启动 MCP 服务器
 * 完全自包含：组件数据内嵌于打包产物中，无需外部文件依赖
 * @returns {Promise<import('@modelcontextprotocol/sdk/server/mcp.js').McpServer>}
 */
export async function startServer() {
  const components = loadComponents()

  const server = new McpServer({
    name: 'toyar-design-component-mcp',
    version: '1.0.0',
  })

  registerTools(server, components)

  const transport = new StdioServerTransport()
  await server.connect(transport)

  // 日志输出到 stderr，避免污染 stdio 协议通道
  console.error(`[toyar-mcp] 已加载 ${components.length} 个组件`)
  return server
}

// 直接运行时（node dist/index.js）启动 stdio 服务
startServer().catch(err => {
  console.error('[toyar-mcp] 启动失败：', err)
  process.exit(1)
})
