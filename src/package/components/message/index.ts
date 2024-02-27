import { createVNode, render } from "vue"
import message from './src/message.vue'
let messageArr = []
export default function MessageJs(msg, options = {
  type: 'info',
  time: 3000
}) {

  const div = document.createElement('div')
  const top =messageArr.reduce((item,current)=>{
    return  item + current.component.exposed.height.value+10
  },100)
  
  const instance = createVNode(message, {
    msg,
    options,
    top,
    onClose:()=>{
      document.body.removeChild(div)
      messageArr= messageArr.filter(item => item.id !== instance.id)
      allMove(instance)
    }
  })
  messageArr.push(instance)

  function allMove(id){
    messageArr.forEach(({component})=>{
      component.exposed.floatMsg(instance.component.exposed.height.value)
    })
  }
  instance.id =Date.now().toString(16)
  render(instance, div)
  document.body.appendChild(div)
}
MessageJs.error =function (msg){
  this(msg,{
    type:'error',
    time:3000
  })
}
MessageJs.warning =function (msg){
  this(msg,{
    type:'warning',
    time:3000
  })
}
MessageJs.success =function (msg){
  this(msg,{
    type:'success',
    time:3000
  })
}
MessageJs.info =function (msg){
  this(msg,{
    type:'info',
    time:3000
  })
}