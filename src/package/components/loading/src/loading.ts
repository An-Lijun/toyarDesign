
import TyLoading from './loading.vue'
import { createVNode, render } from "vue"

const createLoading = (append=document.body) => {
  const div = document.createElement('div')
  const instance = createVNode(TyLoading)
  
  append.style.position ='relative'
  
  render(instance, div)
  append.appendChild(div)
  function close() {
    append.removeChild(div)
  }
  return {
    close
  }
}
export default {
  created(el,vnode) {
  },
  updated(el,vnode) {
    const {value} =vnode
    if(value){
      const {close} = createLoading(el)
      el.close = close
    }else{
      if(el.close){
        el.close()
      }
    }
  },
}