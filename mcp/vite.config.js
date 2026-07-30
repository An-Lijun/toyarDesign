import { defineConfig } from 'vite'
import fs from 'node:fs'

// 读取本包依赖清单，作为 external 列表（运行时从 node_modules 解析，不打包进产物）
const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf-8'))
const depNames = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      formats: ['es'],
      fileName: 'index',
    },
    outDir: 'dist',
    emptyOutDir: true,
    // MCP 服务器为本地开发工具，保留可读结构，不做压缩
    minify: false,
    sourcemap: false,
    rollupOptions: {
      // 用函数匹配依赖及其子路径（如 @modelcontextprotocol/sdk/server/mcp.js）
      external(id) {
        if (/^node:/.test(id)) return true
        return depNames.some(dep => id === dep || id.startsWith(dep + '/'))
      },
      output: {
        entryFileNames: 'index.js',
        format: 'es',
      },
    },
  },
})
