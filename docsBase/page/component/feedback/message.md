# message

## 使用方式一

:::demo

```html
<TyButton @click="message">message</TyButton>
```

```js
const message = () => {
  TyMessage('你好?', {
    time: 3500,
    type: 'success'
  })
}
```

:::

## 使用方式二

:::demo

```html
<TyButton @click="message1">message1</TyButton>
```

```js
const message1 = () => {
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

<div class="listTb">

| 属性   | 描述                       | 类型   | 值  | 默认                       |
| ------ | -------------------------- | ------ | --- | -------------------------- |
| type   | message 的类型             | string | --  | info/success/error/warning |
| 类方法 | warning/info/error/success | string | --  | --                         |

</div>
