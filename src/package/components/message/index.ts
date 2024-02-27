import { createVNode, render } from "vue"
import message from './src/message.vue'
let messageArr = []

const getTop = ()=>messageArr.reduce((item,current)=>{
  return  item + current.component.exposed.height.value+10
},100)

const createMsg = (msg, options,div)=>{
  const top =getTop()
  const instance = createVNode(message, {
    msg,
    options,
    top,
    onClose:()=>{
  if(window&&window.document){
      
      document?.body.removeChild(div)
      messageArr= messageArr.filter(item => item.id !== instance.id)
      allMove(instance)
  }
    }
  })
  function allMove(instance){
    messageArr.forEach(({component})=>{
      component.exposed.floatMsg(instance.component.exposed.height.value)
    })
  }
  instance.id =Date.now().toString(16)
  messageArr.push(instance)
  return instance
}

export default function MessageJs(msg, options = {
  type: 'info',
  time: 3000
}) {
  if(window&&window.document){

  const div = document?.createElement('div')

  const instance = createMsg(msg, options,div)
  render(instance, div)
  document?.body.appendChild(div)
  }
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