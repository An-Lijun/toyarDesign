# loading

## 全局loading

:::demo

```html
<TyButton @click="change1">切换</TyButton>
<div style="color:#fff; height: 300px">
</div>
```
```js

const change1=()=>{
  const close = TyLoading()
  setTimeout(()=>{
    close()
  },1500)
}
```
:::

## 局部loading

:::demo

```html
<TyButton @click="change2">切换</TyButton>
<div class="sg-container" style="color:#fff; height: 300px" v-loading="loading"

>
</div>
```
```js
let loading =ref(false)
const change2=()=>{
  loading.value = true
  setTimeout(()=>{
  loading.value = false

  },1500)
}
```
:::

<script setup>
  import {ref} from 'vue'
let TyLoading =()=>{}
if(document){
   import('../../../../src/package/index.ts').then(res=>{
     TyLoading =res.TyLoading
   })
}
const change1=()=>{
  const close = TyLoading()
  setTimeout(()=>{
    close()
  },1500)
}

let loading =ref(false)
const change2=()=>{
  loading.value = true
  setTimeout(()=>{
  loading.value = false

  },1500)
}
</script>