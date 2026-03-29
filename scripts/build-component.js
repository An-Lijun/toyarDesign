import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const componentName = process.argv[2]

if (!componentName) {
  console.error('请提供组件名称，例如: node scripts/build-component.js button')
  console.log('\n可用组件列表:')
  console.log('  button, input, select, dialog, table, form, checkbox, radio...')
  process.exit(1)
}

console.log(`正在打包组件: ${componentName}`)

const buildProcess = spawn('npx', [
  'vite', 
  'build', 
  '--config', 
  join(__dirname, '../vite.component.config.ts')
], {
  cwd: join(__dirname, '..'),
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    COMPONENT_NAME: componentName
  }
})

buildProcess.on('close', (code) => {
  if (code === 0) {
    console.log(`\n组件 ${componentName} 打包成功!`)
    console.log(`输出目录: dist/components/${componentName}/`)
  } else {
    console.error(`\n打包失败，退出码: ${code}`)
  }
  process.exit(code)
})
