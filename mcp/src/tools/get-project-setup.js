import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { z } from 'zod'
import { textResult } from '../utils/result.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function loadProjectSetup() {
  const setupPath = path.join(__dirname, '../data/project-setup.json')
  if (fs.existsSync(setupPath)) {
    try {
      return JSON.parse(fs.readFileSync(setupPath, 'utf-8'))
    } catch {
      // fallthrough
    }
  }
  return {
    packageName: 'toyar-design',
    version: '1.0.0',
    installCommand: 'npm install toyar-design',
    cssPath: 'toyar-design/dist/toyar-design.css',
    globalRegister: 'app.use(toyar)',
    namedImportExample: "import { TyButton } from 'toyar-design'",
    setupNote: '先引入 CSS 文件，再通过 app.use(toyar) 全局注册；组件库同时支持按需引入。',
  }
}

/**
 * 注册 get_project_setup 工具：返回项目工程化信息
 */
export function registerGetProjectSetup(server) {
  server.tool(
    'get_project_setup',
    '获取 toyar-design 组件库的工程化信息：包名、CSS 路径、全局注册方式、安装命令等。',
    {
      detail: z.enum(['brief', 'full']).optional().describe('返回详细程度，brief 只返回关键字段，full 返回完整信息'),
    },
    async ({ detail = 'full' }) => {
      const setup = loadProjectSetup()
      if (detail === 'brief') {
        const { packageName, cssPath, globalRegister, installCommand } = setup
        return textResult(JSON.stringify({ packageName, installCommand, cssPath, globalRegister }, null, 2))
      }
      return textResult(JSON.stringify(setup, null, 2))
    }
  )
}
