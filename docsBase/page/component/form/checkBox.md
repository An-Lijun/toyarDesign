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

## max

:::demo

```html
<h6>{{ isT }}</h6>
<TyButton @click="()=>{isT=['东']}">赋值</TyButton>
<TyCheckBox v-model="isT" value="东" size="mini" max="2">东</TyCheckBox>
<TyCheckBox v-model="isT" value="南" size="small" max="2">南</TyCheckBox>
<TyCheckBox v-model="isT" value="西" size="medium" max="2">西</TyCheckBox>
<TyCheckBox v-model="isT" value="北" size="large" max="2">北</TyCheckBox>
```

```js
import { ref } from 'vue'
const isT = ref([])
```

:::

## disabled

:::demo

```html
<h6>{{ isT }}</h6>
<TyCheckBox v-model="isT" value="东" size="mini" disabled>东</TyCheckBox>
```

```js
import { ref } from 'vue'
const isT = ref([])
```

:::

## readonly

:::demo

```html
<h6>{{ isT }}</h6>
<TyCheckBox v-model="isT" value="东" size="mini" readonly>东</TyCheckBox>
```

```js
import { ref } from 'vue'
const isT = ref([])
```

:::

## change 事件

:::demo

```html
<h6>{{ isBool }}</h6>
<TyCheckBox v-model="isBool" @change="(val)=>{console.log(val)}" size="mini"
  >布尔</TyCheckBox
>
```

```js
import { ref } from 'vue'
let isBool = ref(false)
```

:::

## checkBoxGroup

:::demo

```html
{{isTG}}
<TyCheckBoxGroup
  v-model="isTG"
  @change="(val)=>{console.log(val)}"
  size="medium"
  max="2"
>
  <TyCheckBox value="南" max="2">南</TyCheckBox>
  <TyCheckBox value="西" max="2">西</TyCheckBox>
  <TyCheckBox value="北" size="large" max="2">北</TyCheckBox>
</TyCheckBoxGroup>
```

```js
import { ref } from 'vue'
let isBool = ref(false)
```

:::

## checkBoxGroupDisabled

:::demo

```html
{{isTG}}
<TyCheckBoxGroup
  :disabled="true"
  v-model="isTG"
  @change="(val)=>{console.log(val)}"
  size="medium"
  max="2"
>
  <TyCheckBox value="南" max="2">南</TyCheckBox>
  <TyCheckBox value="西" max="2">西</TyCheckBox>
  <TyCheckBox value="北" size="large" max="2">北</TyCheckBox>
</TyCheckBoxGroup>
```

```js
import { ref } from 'vue'
let isBool = ref(false)
```

:::

## 属性(Attributes)

<div class="listTb">

| 属性       | 描述           | 类型          | 值                        | 默认  |
| ---------- | -------------- | ------------- | ------------------------- | ----- |
| size       | 组件大小       | string        | mini/ small/ medium/ mini | mini  |
| modelValue | v-model        | Array,Boolean | --                        | --    |
| value      | 选中后的值     | string/number | mini/ small/ medium/ mini | mini  |
| max        | 选中最大条数   | string        | number                    | ''    |
| disabled   | 禁用           | boolean       |                           | false |
| canHarf    | 是否支持半选择 | boolean       |                           | false |
</div>

## 事件(emit)

<div class="listTb">

| 名称   | 描述             |
| ------ | ---------------- |
| change | radio 改变后触发 |
</div>

## checkBoxGroup

## 属性(Attributes)

<div class="listTb">

| 属性       | 描述         | 类型          | 值                        | 默认  |
| ---------- | ------------ | ------------- | ------------------------- | ----- |
| size       | 组件大小     | string        | mini/ small/ medium/ mini | mini  |
| max        | 选中最大条数 | string        | number                    | ''    |
| disabled   | 禁用         | boolean       |                           | false |
| modelValue | v-model      | Array,Boolean | --                        | --    |
</div>

## 事件(emit)

<div class="listTb">

| 名称   | 描述             |
| ------ | ---------------- |
| change | radio 改变后触发 |

</div>

<script setup>
  import {ref} from 'vue'
  const isC =ref(false)
  let isBool = ref(false)
  const isT =ref([])
  const isTG =ref([])

</script>
