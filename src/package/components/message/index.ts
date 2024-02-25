import { createApp,provide } from "vue"
import message from './src/message.vue'

const messageArr=[]
export default function MessageJs(msg, options={
  type:'info',
  time:3000
}) {
  
  const div = document.createElement('div')
  document.body.appendChild(div)
  let top =messageArr.length * 56 +100
  messageArr.push(1)
  const app = createApp(message, {
    msg,
    options,
    top
  })
  app.mount(div)
  setTimeout(()=>{
    app.unmount(message)
    document.body.removeChild(div)
    messageArr.shift()
  },options.time)
}