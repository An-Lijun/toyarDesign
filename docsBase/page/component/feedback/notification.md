# notification

## 使用方式一

:::demo
```html
  <TyButton @click="notification">notification</TyButton>
```
```js
const notification =()=>{
    TyNotification('你好Ty-Design',{
    time:3500,
    type:'success'
  })
}

```
:::

## 使用方式二 

:::demo
```html
  <TyButton @click="notification1">notification1</TyButton>
```
```js
const notification1 =()=>{
   TyNotification('你好Ty-Design',{
    time:3500,
    type:'error'
  })
}

```
:::
<script setup>
// import {TyMessage} from '../../../../src/package/index.ts'
let TyNotification =()=>{}
if(document){
   import('../../../../src/package/index.ts').then(res=>{
     TyNotification =res.TyNotification
   })
}
const notification =()=>{
    TyNotification('你好Ty-Design',{
    time:3500,
    type:'success'
  })
}
const notification1 =()=>{
   TyNotification('你好Ty-Design',{
    time:3500,
    type:'error'
  })
}


</script>
## 属性(Attributes)


| 属性       | 描述                           | 类型     | 值                        | 默认          | 
| ---------- | ------------------------------ | -------- | ------------------------- | ------------- |
| type       | message的类型                       | string   | -- |  info/success/error/warning  |
| 类方法       | warning/info/error/success           | string   | -- | -- |

