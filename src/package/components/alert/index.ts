import { createVNode, ref, render } from "vue"
import dialog from "../dialog/dialog.vue"
let visible =ref(false)
const createAlert= (info, options,div)=>{
  const instance = createVNode(dialog, {
    info,
    title:options.title,
    visible,
    "onUpdate:visible":()=>{
      visible.value=false
      if(window&&window.document){

        document?.body.removeChild(div)
      }
    }
  })
  return instance
}


export default function AlertJs(info, options = {
  title: '提示'
}) {
  if(window&&window.document){

  const div = document?.createElement('div')

  const instance = createAlert(info, options,div)
  render(instance, div)
  document?.body.appendChild(div)
  nextTick(()=>{
    visible.value=true
  })
}
  
}