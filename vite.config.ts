import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from "path";
import VueSetupExtend from 'vite-plugin-vue-setup-extend'//setUp name
import autoImport from 'unplugin-auto-import/vite'//引入语法
import dts from 'vite-plugin-dts'//类型声明产物
import bemStaticOptimization from './scripts/vite-plugin-bem-static'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  include: ['toyaricon'],
  build: {
    //压缩（esbuild，console/debugger 移除见顶层 esbuild.drop）
    minify: true,
    clearScreen: true,
    rollupOptions: {
      //忽略打包vue文件
      //input: ["index.ts"],
      external: ['vue', 'toyaricon'],
      input: {
        main: join(__dirname, 'src/package/index.ts'),
      },
      output: {
        inlineDynamicImports:false,
        chunkFileNames: 'js/[name]-[hash].js',
        // CSS 产物锁定为 toyar-design.css（保持向后兼容），其他资源走默认命名
        assetFileNames: (assetInfo) =>
          assetInfo.name && assetInfo.name.endsWith('.css')
            ? 'toyar-design[extname]'
            : 'assets/[name]-[hash][extname]',
        format: "es",
        globals: {
          vue: "Vue",
        },
        entryFileNames: "index.js",
        dir: "dist",
        exports: "named",
      },
    }
  },
  // 生产构建移除 console/debugger（esbuild 压缩选项，替代原无效的 terserOptions）
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  css: {
    modules: {
      // 自定义 hash 生成规则
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  resolve:{
    alias: {
      '@': join(__dirname, "src"),
      // 开发环境下指向本地 node_modules，生产构建时由 external 处理
      ...(mode === 'development' ? {
        'toyaricon': join(__dirname, "node_modules/toyaricon/dist"),
      } : {}),
    },
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
      staticImport: true,
    }),
  ],
}))
