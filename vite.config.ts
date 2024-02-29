import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from "path";
import VueSetupExtend from 'vite-plugin-vue-setup-extend'//setUp name
import autoImport from 'unplugin-auto-import/vite'//引入语法

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    //压缩
    minify: false,
    lib: {
      entry:  'src/package/index.ts', // 设置入口文件
      name: 'toyar', // 起个名字，安装、引入用
      fileName: (format) => `vite-lib.${format}.js` // 打包后的文件名
    },
    rollupOptions: {
      //忽略打包vue文件
      //input: ["index.ts"],
      external: ['vue'],
      input: {
        main: join(__dirname, 'src/package/index.ts'),
      },
      output: {
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
  resolve:{
    alias: {
      '@': join(__dirname, "src"),
    },
  },
  plugins: [vue(), VueSetupExtend(), autoImport({ imports: ['vue'] })],
})
