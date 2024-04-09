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

## 禁用

:::demo

```html
<TyRadio v-model="isC" :value="2" size="mini" disabled>123</TyRadio>
```

```js
import { ref } from 'vue'
const isC = ref('')
```

:::

## 只读

:::demo

```html
<TyRadio v-model="isC" :value="2" size="mini" readonly>123</TyRadio>
```

```js
import { ref } from 'vue'
const isC = ref('')
```

:::

## js 赋值

:::demo

```html
<TyButton @click="isC0=1">赋值</TyButton>
<hr />
<TyRadio v-model="isC0" :value="1" @change="change" size="mini">123</TyRadio>
<TyRadio v-model="isC0" :value="2" @change="change" size="mini">123</TyRadio>
```

```js
import { ref } from 'vue'
const isC0 = ref('')
const change = newV => {
  console.log(newV)
}
```

:::

## 触发事件

:::demo

```html
不推荐这么使用推荐使用radioGroup
<TyRadio v-model="isC0" :value="1" @change="change" size="mini">123</TyRadio>
<TyRadio v-model="isC0" :value="2" @change="change" size="mini">123</TyRadio>
```

```js
import { ref } from 'vue'
const isC0 = ref('')
const change = (newV, oldV) => {
  console.log(newV, oldV)
}
```

:::

## radioOptions

:::demo

```html
{{ isC }}
<TyButton @click="isC=2">赋值</TyButton>
<hr />
<TyRadioGroup v-model="isC" @change="(val)=>{console.log('change',val)}">
  <TyRadio :value="1" size="mini">123</TyRadio>
  <TyRadio :value="2" size="small">456</TyRadio>
  <TyRadio :value="3" size="small">456</TyRadio>
</TyRadioGroup>
```

```js
import { ref } from 'vue'
const isC = ref('')
```
:::


## radioOptions

:::demo

```html
{{ isC }}
<TyButton @click="isC=2">赋值</TyButton>
<hr />
<TyRadioGroup v-model="isC" @change="(val)=>{console.log('change',val)}" size="medium" disabled>
  <TyRadio :value="1" >123</TyRadio>
  <TyRadio :value="2" >456</TyRadio>
  <TyRadio :value="3" >456</TyRadio>
</TyRadioGroup>
```

```js
import { ref } from 'vue'
const isC = ref('')
```
:::

<script setup>
import {ref} from 'vue'
const isC =ref('')
const isC0 = ref('')
const change=(newV)=>{
  console.log(newV)
}

</script>

## radio

## 属性(Attributes)

<div class="listTb">

| 属性       | 描述         | 类型    | 值                        | 默认  |
| ---------- | ------------ | ------- | ------------------------- | ----- |
| size       | 组件大小     | string  | mini/ small/ medium/ mini | mini  |
| value      | 选中后的值   | string  | mini/ small/ medium/ mini | mini  |
| modelValue | v-model 绑定 | string  |                           |       |
| disabled   | 是否禁用     | boolean |                           | false |

</div>

## 插槽(slot)

<div class="listTb">

| 名称    | 描述         |
| ------- | ------------ |
| default | radio 的描述 |

</div>

## 事件(emit)

<div class="listTb">

| 名称    | 描述         |
| ------- | ------------ |
| change | radio改变后触发 |

</div>

## radioGroup

## 属性(Attributes)

<div class="listTb">

| 属性       | 描述         | 类型    | 值                        | 默认  |
| ---------- | ------------ | ------- | ------------------------- | ----- |
| size       | 组件大小     | string  | mini/ small/ medium/ mini | mini  |
| modelValue | v-model 绑定 | string  |                           |       |
| disabled   | 是否禁用     | boolean |                           | false |

</div>

## 插槽(slot)

<div class="listTb">

| 名称    | 描述         |
| ------- | ------------ |
| default | radio  |

</div>

## 事件(emit)

<div class="listTb">

| 名称    | 描述         |
| ------- | ------------ |
| change | radio改变后触发 |

</div>
