import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'
import VueSetupExtend from 'vite-plugin-vue-setup-extend' //setUp name
import autoImport from 'unplugin-auto-import/vite' //引入语法
import dts from 'vite-plugin-dts' //类型声明产物
import bemStaticOptimization from './scripts/vite-plugin-bem-static'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  include: ['toyaricon'],
  build: {
    //压缩（esbuild，console/debugger 移除见顶层 esbuild.drop）
    minify: true,
    clearScreen: true,
    // lib 模式确保 Rollup 保留入口命名导出（app 模式会丢弃 export 且强制 preserveEntrySignatures:false）
    lib: {
      entry: join(__dirname, 'src/package/index.ts'),
      formats: ['es']
    },
    rollupOptions: {
      //外部依赖不打包，由消费方自行安装
      external: ['vue', 'toyaricon', '@popperjs/core', 'robinson', 'xss'],
      output: {
        // preserveModules 保留模块结构，使消费方打包器可在模块级 tree-shake
        // 效果：import { TyButton } from 'toyar-design' 只打包 button 模块，不打包其余 61 个组件
        preserveModules: true,
        preserveModulesRoot: 'src/package',
        entryFileNames: '[name].js',
        // CSS 产物锁定为 toyar-design.css（保持向后兼容），其他资源走默认命名
        assetFileNames: assetInfo =>
          assetInfo.name && assetInfo.name.endsWith('.css') ? 'toyar-design[extname]' : 'assets/[name]-[hash][extname]',
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  // 生产构建移除 console/debugger（esbuild 压缩选项，替代原无效的 terserOptions）
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : []
  },
  css: {
    modules: {
      // 自定义 hash 生成规则
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
      // 开发环境下指向本地 node_modules，生产构建时由 external 处理
      ...(mode === 'development'
        ? {
            toyaricon: join(__dirname, 'node_modules/toyaricon/dist')
          }
        : {})
    }
  },
  plugins: [
    bemStaticOptimization(),
    vue(),
    VueSetupExtend(),
    autoImport({ imports: ['vue'] }),
    // 生成类型声明产物，entryRoot 决定输出相对路径基准
    dts({
      entryRoot: 'src/package',
      outDir: 'dist',
      include: ['src/package/**/*.ts', 'src/package/**/*.vue'],
      exclude: ['src/package/components/**/test/**', 'src/package/color/**'],
      staticImport: true
    })
  ]
}))
