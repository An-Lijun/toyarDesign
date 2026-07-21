import { generateManifest } from './generate-metadata.js'

export default function vitePluginManifest() {
  return {
    name: 'vite-plugin-manifest',
    async buildStart() {
      console.log('📦 开始生成组件元数据...')
      await generateManifest()
      console.log('✅ 组件元数据生成完成')
    },
    async closeBundle() {
      await generateManifest()
    }
  }
}