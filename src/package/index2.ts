
import './assets/index.scss'
import './icon'
import generateColor from './color/index.js'
export  * from './hooks/changeTheme'
import TyAlert from './components/alert'
import TyDrawer from './components/drawer'
import TyNotification from './components/notification'

export default {
  version: '0.0.1',
  install:(app)=>{
    //自动拼接测试路由方法
    
    function installComponents() {
      //读取@/views/trades/下的所有文件夹并读取以/src/index.vue的文件
      const files = import.meta.glob('@/package/components/**/index.ts');
      // console.log();
      for (const item in files) {
          import(item).then(res=>{
            console.log();
            
            if(res.default && res.default.name !='undefined'){
              app.use(res.default)
            }
          })
          
      }
    }
    installComponents() 
    document.getElementsByTagName('html')[0].setAttribute('toyar-theme', 'light')
  

  }
}

export const TyThemeChange =()=>{}


export {
  generateColor,
  TyAlert,
  TyDrawer,
  TyNotification
}