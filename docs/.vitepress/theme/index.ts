import toyar from '../../../src/package/index'
import demoBlock from '../demoBlock.vue'
import DefaultTheme from 'vitepress/theme'
import '../../assets/index.scss'
export default {
  extends:DefaultTheme,
  enhanceApp({ app }) {
    app.use(toyar),
    app.component('demo-block',demoBlock)
  }
}