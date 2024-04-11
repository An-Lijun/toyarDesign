import { createVNode, ref, render,nextTick, h } from "vue"
import dialog from "../dialog/src/dialog.vue"
import  TyIcon  from "../icon"

interface IOption{
  title:String,
  type:String
}

let visible = ref(false)
let doc = document || null


const createAlert = (info:String, options:IOption, div:HTMLDivElement) => {
  const msgIconObj = {
    info: 'ty-information-fill',
    success: 'ty-checkbox-circle-fill',
    warning: 'ty-information-fill',
    error: 'ty-close-circle-fill'
  }
  const colorObj = {
    'info': 'primary',
    'success': 'success',
    'warning': 'warning',
    'error': 'danger'
  }
  const instance = createVNode(dialog, {
    info,
    modelValue:visible,
    isUnderLine:false,
    'onUpdate:modelValue':()=>{
      visible.value=false
      if (doc) {
        doc?.body.removeChild(div)
      }
    }
  },{
    title:h('div', {
      
      style:{
        textAlign:'center'
      }
    },[
      h(TyIcon,{
        icon:msgIconObj[options.type]||'',
        style:{
          display:options.type?'inline':'none',
          color:'red',
          marginRight:'10px'
        }
      }),
      info
    ])
  }
  )
  return instance
}


export default function AlertJs(info:String, options = {
  title: '提示'
}) {
  if (doc) {

    const div = doc?.createElement('div')
    if (div) {
      const instance = createAlert(info, options, div)
      render(instance, div)
      doc?.body.appendChild(div)
      nextTick(() => {
        visible.value = true
      })
    }
  }
}