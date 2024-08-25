import {ref} from 'vue'
export const nowTheme = ref('')
// 切换主题

let html = document.documentElement
export const TyThemeChange=(theme:string)=>{
  nowTheme.value = theme || html.getAttribute('toyar-theme')==='light'?'dark':'light'
  if(theme){
    return html.setAttribute('toyar-theme', theme)
  }
  html.setAttribute('toyar-theme', nowTheme.value)
}