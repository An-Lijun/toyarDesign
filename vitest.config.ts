import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias: {
      '@': join(__dirname, "src"),
    },
  },
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/package/components/**/*.vue'],
    },
    pool: 'forks',
    forks: {
      isolate: true
    }
  },
})
