import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import VueSetupExtend from 'vite-plugin-vue-setup-extend'//setUp name
import autoImport from 'unplugin-auto-import/vite'//引入语法

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueSetupExtend(), autoImport({ imports: ['vue'] })],
})
