import demoBlock from '../demoBlock.vue'
import DefaultTheme from 'vitepress/theme'
import '../../assets/index.scss'
import iconList from '../iconList.vue'
export default {
  extends:DefaultTheme,
  enhanceApp({ app }) {
    app.component('demo-block',demoBlock),
    app.mixin({
      mounted() {
        console.log("1");
        
        if(!app.$message){
          import('../../../src/package/index').then((res)=>{
            app.$message=res.TyMessage
            app.use(res.default),
            app.component('iconList',iconList)
          })
        }
      },
    })

  }
}
