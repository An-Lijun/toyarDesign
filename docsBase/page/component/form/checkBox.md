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

## 属性(Attributes)

<div class="listTb">

| 属性     | 描述         | 类型     | 值                        | 默认  |
| -------- | ------------ | -------- | ------------------------- | ----- |
| size     | 组件大小     | string   | mini/ small/ medium/ mini | mini  |
| value    | 选中后的值   | string   | mini/ small/ medium/ mini | mini  |
| max      | 选中最大条数 | string   | number                    | ''    |
| disabled | 禁用         | boolean  |                           | false |
| readonly | 禁用         | readonly |                           | false |

</div>

<script setup>
  import {ref} from 'vue'
 const isC =ref(false)
  const isT =ref([])


</script>
