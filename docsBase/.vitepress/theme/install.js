import {TyThemeChange} from '../../../src/package/index'

export default function install(){
  if(document){
    setTimeout(() => {
      let ctb = document.querySelector('.content-body')
      // let btn = ctb?.querySelector('.VPSwitch') as HTMLButtonElement
      let html = document.querySelector('html')
      let className = html.className
      TyThemeChange(className ==='dark'?'dark':'light')

      const observer = new MutationObserver(mutations => {
         let classNM =html?.className
         
         if(classNM !==className){
            TyThemeChange(classNM==='dark'?'dark':'light')
            className =classNM
        }
      });
      observer.observe(html, {
        childList: false, // 监视元素 第一级直接子节点 的变动
        subtree: false, // 监视元素 所有后代节点 的变动（前提要求 childList = true）
        attributes: true, // 监视元素 属性 的变动
      });
    }, 500);
  }
}