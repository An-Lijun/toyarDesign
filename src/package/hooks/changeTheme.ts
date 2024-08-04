import {ref} from 'vue'
export const nowTheme = ref('')
// 切换主题

export const TyThemeChange=()=>{
  let html = document.documentElement
  nowTheme.value = html.getAttribute('toyar-theme')==='light'?'dark':'light'
  html.setAttribute('toyar-theme', nowTheme.value)
}