# checkBox

## 基础用法

:::demo

```html
<div>{{isC}}</div>
<TyCheckBox v-model="isC" :value="2" size="mini">123</TyCheckBox>
```

```js
import { ref } from 'vue'
const isC = ref(false)
```

:::

## 修改选中的值与大小

:::demo

```html
<h6>{{ isT }}</h6>
<TyCheckBox v-model="isT" value="东" size="mini">东</TyCheckBox>
<TyCheckBox v-model="isT" value="南" size="small">南</TyCheckBox>
<TyCheckBox v-model="isT" value="西" size="medium">西</TyCheckBox>
<TyCheckBox v-model="isT" value="北" size="large">北</TyCheckBox>
```

```js
import { ref } from 'vue'
const isT = ref([])
```
:::


## 属性(Attributes)

<div class="listTb">

| 属性  | 描述       | 类型   | 值                        | 默认 |
| ----- | ---------- | ------ | ------------------------- | ---- |
| size  | 组件大小   | string | mini/ small/ medium/ mini | mini |
| value | 选中后的值 | string | mini/ small/ medium/ mini | mini |


</div>


<script setup>
  import {ref} from 'vue'
 const isC =ref(false)
  const isT =ref([])


</script>
