import { createVNode, render } from "vue"
import message from './src/message.vue'
let messageArr = []
export default function MessageJs(msg, options = {
  type: 'info',
  time: 3000
}) {
  let top = messageArr.length * 56 + 100;
const div = document.createElement('div')

  const instance = createVNode(message, {
    msg,
    options,
    top,
    onClose:()=>{
      document.body.removeChild(div)
      messageArr= messageArr.filter(item => item.id !== instance.id)
      allMove(instance.id)
    }
  })
  messageArr.push(instance)

  function allMove(id){
    messageArr.forEach(({component})=>{
      component.exposed.floatMsg()
    })
  }
  instance.id =Date.now().toString(16)
  render(instance, div)
  document.body.appendChild(div)
}