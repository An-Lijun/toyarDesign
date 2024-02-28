import { createVNode, ref, render } from "vue"
import dialog from "../dialog/dialog.vue"
let visible =ref(false)
let doc = document||{}

const createAlert= (info, options,div)=>{
  const instance = createVNode(dialog, {
    info,
    title:options.title,
    visible,
    "onUpdate:visible":()=>{
      visible.value=false
      if(doc){

        doc?.body.removeChild(div)
      }
    }
  })
  return instance
}


export default function AlertJs(info, options = {
  title: '提示'
}) {
  if(doc){

  const div = doc?.createElement('div')

  const instance = createAlert(info, options,div)
  render(instance, div)
  doc?.body.appendChild(div)
  nextTick(()=>{
    visible.value=true
  })
}
  
}