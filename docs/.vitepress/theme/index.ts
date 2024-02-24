import toyar from '../../../src/package/index'
import demoBlock from '../demoBlock.vue'
import DefaultTheme from 'vitepress/theme'
import '../../assets/index.scss'
export default {
  extends:DefaultTheme,
  enhanceApp({ app }) {
    app.component('demo-block',demoBlock),
    app.mixin({
      mounted() {
        import('../../../src/package/index').then((res)=>{
          app.use(res.default)
        })
      },
    })

  }
}
// app.use(toyar),
