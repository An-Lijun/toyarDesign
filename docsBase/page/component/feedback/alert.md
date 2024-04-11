# alert


## 基本用法

:::demo

```html
<TyButton @click="alert">123</TyButton>

```
```js
import {TyAlert} from 'xxx'
const alert =()=>{
  TyAlert('你好')
}
```
:::


## 修改title

:::demo

```html
<TyButton @click="alert1">123</TyButton>

```
```js
import {TyAlert} from 'xxx'
const alert1 =()=>{
  TyAlert('你好',{title:'测试'})
}
```
:::

<script setup>
let TyAlert =()=>{}
if(document){
   import('../../../../src/package/index.ts').then(res=>{
     TyAlert =res.TyAlert
   })
}
const alert =()=>{
  TyAlert('你好')
}
const alert1 =()=>{
  TyAlert('你好',{title:'测试',type:'error'})
}
  </script>