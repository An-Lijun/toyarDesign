/**
 * 生成组件的工程化引入/注册/使用说明片段
 * @param {Object} component - 组件元数据
 * @returns {string[]}
 */
export function formatSetupSnippet(component) {
  const name = component.name || component.id
  const related = component.relatedComponents || []
  const imports = [name, ...related].filter(Boolean)

  return [
    '// 安装',
    '// npm install toyar-design',
    '',
    '// main.js：全局注册 + 引入样式',
    "import { createApp } from 'vue'",
    "import App from './App.vue'",
    "import toyar from 'toyar-design'",
    "import 'toyar-design/dist/toyar-design.css'",
    '',
    'const app = createApp(App)',
    'app.use(toyar)',
    'app.mount(\'#app\')',
    '',
    '// 或按需引入（当前组件文件内）',
    `import { ${imports.join(', ')} } from 'toyar-design'`,
  ]
}
