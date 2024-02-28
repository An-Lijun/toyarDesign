# notification

## 使用方式一

:::demo
```html
<ClientOnly>
  <TyButton @click="notification">notification</TyButton>
</ClientOnly>
```
```js
const notification =()=>{
    TyNotification('你好?',{
    time:3500,
    type:'success'
  })
}

```
:::

## 使用方式二 

:::demo
```html
<ClientOnly>
  <TyButton @click="message1">message1</TyButton>
</ClientOnly>
```
```js
const message1 =()=>{
  TyMessage.warning('你好??')
}

```
:::
<script setup>
// import {TyMessage} from '../../../../src/package/index.ts'
let TyMessage =()=>{}
if(document){
   import('../../../../src/package/index.ts').then(res=>{
     TyMessage =res.TyMessage
   })
}
const message =()=>{
    TyMessage('你好?',{
    time:3500,
    type:'success'
  })
}
const message1 =()=>{
  TyMessage.warning('你好??')
}


</script>
## 属性(Attributes)


| 属性       | 描述                           | 类型     | 值                        | 默认          | 
| ---------- | ------------------------------ | -------- | ------------------------- | ------------- |
| type       | message的类型                       | string   | -- |  info/success/error/warning  |
| 类方法       | warning/info/error/success           | string   | -- | -- |

