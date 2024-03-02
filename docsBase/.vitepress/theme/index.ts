import demoBlock from '../demoBlock.vue'
import DefaultTheme from 'vitepress/theme'
import '../../assets/index.scss'
import iconList from '../iconList.vue'
export default {
  extends:DefaultTheme,
  enhanceApp({ app }) {
    app.mixin({
      mounted() {
        if(!app.ook){
          app.component('demo-block',demoBlock),
          import('../../../src/package/index').then((res)=>{
          app.ook=true
          app.use(res.default),
          app.component('iconList',iconList)
          })
        }
      },
    })

  }
}
