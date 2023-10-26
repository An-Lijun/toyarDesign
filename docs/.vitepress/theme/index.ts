import toyar from '../../../src/package/index'
import DefaultTheme from 'vitepress/theme'
export default {
  extends:DefaultTheme,
  enhanceApp({ app }) {
    app.use(toyar)
  }
}