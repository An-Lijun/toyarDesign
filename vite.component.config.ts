import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from "path"
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import autoImport from 'unplugin-auto-import/vite'

const componentName = process.env.COMPONENT_NAME || 'button'

export default defineConfig({
  build: {
    minify: true,
    lib: {
      entry: join(__dirname, `src/package/components/${componentName}/index.ts`),
      name: componentName,
      formats: ['es'],
      fileName: () => `index.js`
    },
    clearScreen: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        inlineDynamicImports: false,
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: '[name].[ext]',
        format: "es",
        globals: {
          vue: "Vue",
        },
        entryFileNames: "index.js",
        dir: `dist/components/${componentName}`,
        exports: "named",
      },
    }
  },
  css: {
    modules: {
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
    },
  },
  plugins: [vue(), VueSetupExtend(), autoImport({ imports: ['vue'] })],
})
