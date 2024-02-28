import TyNotification from './src/notification.vue'
import { createVNode, render } from 'vue'

let notiArr = []
let doc = document || {}

const getTop = () =>
  notiArr.reduce((item, current) => {
    return item + current.component.exposed.height.value + 10
  }, 30)

const createNoti = (msg, options, div) => {
  const top = getTop()
  console.log(top);
  
  const instance = createVNode(TyNotification, {
    title:'提示',
    message:"哈哈哈哈",
    type:'info',
    top,
    time:3000,
    onClose: () => {
      if (doc) {
        doc?.body.removeChild(div)
        notiArr = notiArr.filter(item => item.id !== instance.id)
        allMove(instance)
      }
    }
  })
  function allMove (instance) {
    notiArr.forEach(({ component }) => {
      component.exposed.floatNoti(instance.component.exposed.height.value)
    })
  }
  instance.id = Date.now().toString(16)
  notiArr.push(instance)
  return instance
}

// TyNotification.install = app => {
//   app.component('TyNotification', TyNotification)
// }
// export default TyNotification
export default function NotifyJs (msg, options) {
  if (doc) {
    const div = doc?.createElement('div')
    const instance = createNoti(msg, options, div)
    render(instance, div)
    doc?.body.appendChild(div)
  }
}
