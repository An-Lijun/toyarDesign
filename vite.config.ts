import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from "path";
import VueSetupExtend from 'vite-plugin-vue-setup-extend'//setUp name
import autoImport from 'unplugin-auto-import/vite'//引入语法

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias: {
      '@': join(__dirname, "src"),
    },
  },
  plugins: [vue(), VueSetupExtend(), autoImport({ imports: ['vue'] })],
})
