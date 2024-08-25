# alert


## 基本用法

:::demo

```html
<TyButton @click="alert">123</TyButton>

```
```js
import {TyAlert} from 'toyarDesign'
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
import {TyAlert} from 'toyarDesign'
const alert1 =()=>{
  TyAlert('你好',{title:'测试'})
}
```
:::

## footer 按钮

:::demo

```html
<TyButton @click="alert2">123</TyButton>

```
```js
import {TyAlert} from 'toyarDesign'
const alert2 =()=>{
  TyAlert('你好',{
    title:'测试',
    type:'success',
    sure:{
      text:'OK',
      code:()=>{
        console.log('ok')
      }
    }
  })
}
```
:::


## 控制关闭

:::demo

```html
<TyButton @click="alert3">123</TyButton>

```
```js
import {TyAlert} from 'toyarDesign'
const alert3 =()=>{
 const {distroy} = TyAlert('你好',{
    title:'测试',
    type:'success',
    sure:{
      text:'OK',
      code:()=>{
        console.log('ok')
        distroy()
      }
    }
  })
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

const alert2 =()=>{
  TyAlert('你好',{
    title:'测试',
    type:'success',
    sure:{
      text:'OK',
      code:()=>{
        console.log('ok')
      }
    }
  })
}

const alert3 =()=>{
 const {distroy} = TyAlert('你好',{
    title:'测试',
    type:'success',
    sure:{
      text:'OK',
      code:()=>{
        console.log('ok')
        distroy()
      }
    }
  })
}
  </script>