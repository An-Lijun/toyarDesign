import demoBlock from '../demoBlock.vue'
import DefaultTheme from 'vitepress/theme'
import '../../assets/index.scss'
// import iconList from '../iconList.vue'
export default {
  extends:DefaultTheme,
  enhanceApp({ app }) {
    setTimeout(() => {
      let ctb = document.querySelector('.content-body')
      let btn = ctb?.querySelector('.VPSwitch')
      btn.onclick=(e)=>{
        let day ='light'
        if(btn?.getAttribute('aria-checked')==='true'){
          day='dark'
        }
        document.getElementsByTagName('html')[0].setAttribute('toyar-theme', day)
      }
    }, 500);

    app.mixin({
      mounted() {
        if(!app.ook){
          app.component('demo-block',demoBlock),
          import('../../../src/package/index').then((res)=>{
          app.ook=true
          app.use(res.default)
          // app.component('iconList',iconList)
          })
        }
      },
    })

  }
}
