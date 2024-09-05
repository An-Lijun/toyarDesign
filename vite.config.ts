import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from "path";
import VueSetupExtend from 'vite-plugin-vue-setup-extend'//setUp name
import autoImport from 'unplugin-auto-import/vite'//引入语法
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    //压缩
    minify: false,
    lib: {
      entry:  'src/package/index.ts', // 设置入口文件
      name: 'toyar', // 起个名字，安装、引入用
      formats: ['es'], // 默认['es', 'umd']
      fileName: (format) => `vite-lib.${format}.js` // 打包后的文件名
    },
    rollupOptions: {
      //忽略打包vue文件
      //input: ["index.ts"],
      external: ['vue'],
      input: {
        main: join(__dirname, 'src/package/index.ts'),
        icon:join(__dirname, 'src/package/icon.ts'),
        module:join(__dirname, 'src/package/module.ts'),
      },
      output: {
        inlineDynamicImports:false,
        chunkFileNames: 'js/[name]-[hash].js',
        // assetFileNames(assetInfo){
        //   // /\.svg$/.test(assetInfo.name)
        //   if (assetInfo.type === 'asset') { 
        //     // 匹配资源文件后缀
        //     // 创建media文件夹存放匹配的资源文件,name为该文件的原名，hash为哈希值，ext为文件后缀名，以[name].[hash][ext]命名规则
        //     return `assets/[name].[hash][ext]`;  
        //   }
        //   // 不匹配的资源文件存放至assets，以[name]-[hash].[ext]命名规则，注意两处的命名规则不同
        //   return `assets1/[name]-[hash].[ext]`; 
        // },
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
  plugins: [vue(), VueSetupExtend(), autoImport({ imports: ['vue'] }),chunkSplitPlugin({

    customSplitting: {
      // All files in `src/container` will be merged together in `container` chunk
      // 'style1': [/\.css$/]
      'component':[/\.vue/]

    }
  })],
})
