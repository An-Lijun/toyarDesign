import TyLoading from './src/loading.vue'
import { createVNode, render } from "vue"
import TyLoadingDirc from './src/loading'
const doc = document || {}


const createLoading = (div) => {
  const instance = createVNode(TyLoading,{
    isFixed:true
  })
  function close() {
    doc?.body.removeChild(div)
  }
  return {
    close,
    instance
  }
}
export function LoadingJs(el = doc.body) {
  if (doc) {
    const div = doc?.createElement('div')
    const { instance ,close} = createLoading(div)
    render(instance, div)
    el.appendChild(div)
    return close
  }
}

TyLoadingDirc.install = app=>{
  app.directive('Loading',TyLoadingDirc)
}
export default TyLoadingDirc