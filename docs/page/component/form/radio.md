# rdaio

## 基础用法
:::demo

```html
<TyRadio v-model="isC" :value="2" size="mini">123</TyRadio>
<TyRadio v-model="isC" :value="3" size="small">456</TyRadio>
```

```js
import { ref } from 'vue'
const isC = ref('')
```
:::
## 大小

:::demo

```html
  <TyRadio v-model="isC" :value="2" size="mini">123</TyRadio>
  <TyRadio v-model="isC" :value="3" size="small">456</TyRadio>
  <TyRadio v-model="isC" :value="4" size="medium">456</TyRadio>
  <TyRadio v-model="isC" :value="5" size="large">456</TyRadio>
```

```js
import { ref } from 'vue'
const isC = ref('')
```
:::

<script setup>
  import {ref} from 'vue'
 const isC =ref('')

</script>
## 属性(Attributes)


<div class="listTb">

| 属性       | 描述                           | 类型     | 值                        | 默认          | 
| ---------- | ------------------------------ | -------- | ------------------------- | ------------- |
| size       | 组件大小                       | string   | mini/ small/ medium/ mini | mini |
| value       | 选中后的值                       | string   | mini/ small/ medium/ mini | mini |
</div>



## 插槽(slot)

<div class="listTb">

| 名称     | 描述         |
| -------- | ------------ |
| default   | radio的描述     |

</div>

