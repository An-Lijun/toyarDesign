#!/usr/bin/env node
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { loadComponents } from './data/loader.js'
import { registerTools } from './tools/index.js'

const __filename = fileURLToPath(import.meta.url)

/**
 * 解析组件数据目录
 * 优先级：options > 环境变量 > process.cwd()/src/package/components
 */
function resolveComponentsDir(options = {}) {
  if (options.componentsDir) return options.componentsDir
  if (process.env.TOYAR_COMPONENTS_DIR) return process.env.TOYAR_COMPONENTS_DIR
  return path.join(process.cwd(), 'src/package/components')
}

/**
 * 创建并启动 MCP 服务器
 * @param {Object} [options]
 * @param {string} [options.componentsDir] - 组件目录路径
 * @param {Object} [options.transport] - 自定义传输（默认 stdio）
 * @returns {Promise<import('@modelcontextprotocol/sdk/server/mcp.js').McpServer>}
 */
export async function startServer(options = {}) {
  const componentsDir = resolveComponentsDir(options)

  const components = loadComponents(componentsDir)

  const server = new McpServer({
    name: 'toyar-design-component-mcp',
    version: '1.0.0',
  })

  registerTools(server, components)

  const transport = options.transport || new StdioServerTransport()
  await server.connect(transport)

  // 日志输出到 stderr，避免污染 stdio 协议通道
  console.error(`[toyar-mcp] 已加载 ${components.length} 个组件，数据目录：${componentsDir}`)
  return server
}

// 直接运行时（node dist/index.js）启动 stdio 服务
const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)
if (isMain) {
  startServer().catch(err => {
    console.error('[toyar-mcp] 启动失败：', err)
    process.exit(1)
  })
}
