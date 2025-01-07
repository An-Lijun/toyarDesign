# alert

## 基本用法

:::demo

```html
<TyButton @click="alert">123</TyButton>
```

```js
import { TyAlert } from 'toyarDesign'
const alert = () => {
  TyAlert('你好')
}
```

:::

## 修改 title

:::demo

```html
<TyButton @click="alert1">123</TyButton>
```

```js
import { TyAlert } from 'toyarDesign'
const alert1 = () => {
  TyAlert('你好', { title: '测试' })
}
```

:::

## footer 按钮

:::demo

```html
<TyButton @click="alert2">123</TyButton>
```

```js
import { TyAlert } from 'toyarDesign'
const alert2 = () => {
  TyAlert('你好', {
    title: '测试',
    type: 'success',
    sure: {
      text: 'OK',
      code: () => {
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
import { TyAlert } from 'toyarDesign'
const alert3 = () => {
  const { distroy } = TyAlert('你好', {
    title: '测试',
    type: 'success',
    sure: {
      text: 'OK',
      code: () => {
        console.log('ok')
        distroy()
      }
    }
  })
}
```

:::

## 内容插槽

:::demo

```html
<TyButton @click="alert4">内容插槽</TyButton>
```

```js
import {TyAlert} from 'toyarDesign'
  const table = h(TyTable,{
    columns:[
        { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
    ],
    data:[
        {
    name: '张三',
    age: '18',
    address: '南京'
  },
  {
    name: '李四',
    age: '18',
    address: '上海'
  },
  {
    name: '张二麻子',
    age: '18',
    address: '长春'
  }
    ]
  })
 const {distroy} = TyAlert(table,{
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

## 属性(Attributes)

<div class="listTb">

| 属性 | 描述           | 类型   | 值  | 默认                       |
| ---- | -------------- | ------ | --- | -------------------------- |
| info | 弹窗内容   | string/render | --  | --                        |
| options | 弹窗的配置 | object | --  | '{  title: '提示',type: 'info',isUnderLine: false}' |
| options.title | 弹窗标题   | string/render | --  | --                        |
| options.type | 弹窗主题   | string ['info','success','warning','error'] | --  | info                   |
| options.isUnderLine | 弹窗是否有下划线   | boolean | --  | false                   |
| options.sure | 点击同意的对象   | object | --  | --                   |
| options.sure.text | 同意按钮的内容   | string | --  | 确定                   |
| options.sure.code | 同意按钮的函数   | Function | --  |                    |
| options.cancel | 点击拒绝的对象   | object | --  | --                   |
| options.cancel.text | 拒绝按钮的内容   | string | --  | 取消                   |
| options.cancel.code | 拒绝按钮的函数   | Function | --  |                    |


</div>

<script setup>
import {h} from 'vue'

let TyAlert =()=>{}
let TyTable =()=>{}

if(document){
   import('../../../../src/package/index.ts').then(res=>{
     TyAlert =res.TyAlert
     TyTable =res.TyTable
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

const alert4 =()=>{
  const table = h(TyTable,{
    columns:[
        { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
    ],
    data:[
        {
    name: '张三',
    age: '18',
    address: '南京'
  },
  {
    name: '李四',
    age: '18',
    address: '上海'
  },
  {
    name: '张二麻子',
    age: '18',
    address: '长春'
  }
    ]
  })
 const {distroy} = TyAlert(table,{
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
