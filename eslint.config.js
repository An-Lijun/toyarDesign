import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

/**
 * ToyarDesign ESLint Flat Config
 *
 * 适用范围:Vue3 + TypeScript + JavaScript 混合工程
 * 严格度:推荐(关键错误 error,风格问题 warn,不阻断现有代码运行)
 */
export default [
  // ========== 全局忽略 ==========
  {
    name: 'toyar/ignores',
    ignores: [
      'dist/**',
      'distBase/**',
      'docs/**',
      'docsBase/.vitepress/cache/**',
      'docsBase/.vitepress/dist/**',
      'node_modules/**',
      // 第三方源码内嵌目录(应后续迁移为 npm 依赖)
      'src/package/color/**',
      // MCP 子工程(独立 package.json)
      'mcp/**',
      // 自动生成的类型声明
      'auto-imports.d.ts',
      'src/package/iconLists.js',
      '**/metadata.json',
    ],
  },

  // ========== 基础推荐 ==========
  js.configs.recommended,

  // ========== Vue3 推荐配置 ==========
  ...pluginVue.configs['flat/recommended'],

  // ========== Vue + TypeScript 配置 ==========
  ...vueTsEslintConfig(),

  // ========== 关闭与 Prettier 冲突的格式化规则 ==========
  skipFormatting,

  // ========== 全局规则设定 ==========
  {
    name: 'toyar/global-rules',
    files: ['**/*.{js,mjs,cjs,ts,tsx,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // —— 错误级(error):潜在 bug 与不安全写法 ——
      'no-unused-vars': 'off', // 交给 @typescript-eslint/no-unused-vars
      'no-undef': 'off', // TS 项目由 TS 负责未定义检查
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      // —— 警告级(warn):代码质量提示,不阻断 ——
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      // —— Vue 适配 ——
      // 组件库统一 Ty 前缀,已是多词,关闭多词组件名限制
      'vue/multi-word-component-names': 'off',
      // 允许 v-html(水印/富文本场景需要)
      'vue/no-v-html': 'off',
      // 缩进交给 Prettier,避免冲突
      'vue/html-indent': 'off',
      'vue/script-indent': 'off',
    },
  },

  // ========== 脚本与配置文件:放宽 console ==========
  {
    name: 'toyar/scripts',
    files: [
      'scripts/**/*.{js,mjs,cjs,ts}',
      '*.config.{js,ts,mjs,cjs}',
      'vite.config.ts',
      'vite.component.config.ts',
    ],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // ========== 测试文件:放宽规则 ==========
  {
    name: 'toyar/tests',
    files: [
      '**/*.test.{js,ts}',
      '**/*.spec.{js,ts}',
      'src/package/components/**/test/**/*.{js,ts,vue}',
    ],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
]
