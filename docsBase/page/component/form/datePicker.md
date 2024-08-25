# calendar

## 基本用法

:::demo

```html
<div>{{cal1}}</div>
<TyDatePicker v-model="cal1"></TyDatePicker>
```

```js
import { ref } from 'vue'
const cal1 = ref('')
```
:::


## placeholder

:::demo

```html
<div>{{cal1}}</div>
<TyDatePicker v-model="cal1" placeholder='请选择'></TyDatePicker>
```
```js
import { ref } from 'vue'
const cal1 = ref('')
```
:::

## format
:::demo
```html
<div>{{cal1}}</div>
<TyDatePicker v-model="cal1" placeholder='请选择' format='yyyy年MM月dd日'></TyDatePicker>
```
```js
import { ref } from 'vue'
const cal1 = ref('')
```
:::

## disabled
:::demo
```html
<div>{{cal1}}</div>
<TyDatePicker v-model="cal1" disabled></TyDatePicker>
```

```js
import { ref } from 'vue'
const cal1 = ref('')
```
:::

## 继承disabled
:::demo
```html
<div>{{cal1}}</div>
<TyForm>
  <TyFormItem disabled>
  <TyDatePicker v-model="cal1" ></TyDatePicker>
</TyFormItem>
</TyForm>
<hr>
<TyForm disabled>
  <TyFormItem >
  <TyDatePicker v-model="cal1" ></TyDatePicker>
</TyFormItem>
</TyForm>
```
```js
import { ref } from 'vue'
const cal1 = ref('')
```
:::

## readonly
:::demo
```html
<div>{{cal1}}</div>
<TyDatePicker v-model="cal1" readonly></TyDatePicker>
```

```js
import { ref } from 'vue'
const cal1 = ref('')
```
:::

## 继承size
:::demo
```html

<TyForm>
  <TyFormItem size='large'>
  <TyDatePicker v-model="cal1" ></TyDatePicker>
</TyFormItem>
</TyForm>
<hr>
<TyForm size='mini'>
  <TyFormItem >
  <TyDatePicker v-model="cal1" ></TyDatePicker>
</TyFormItem>
</TyForm>

```
```js
import { ref } from 'vue'
const cal1 = ref('')
```
:::


## size
:::demo
```html
<TyDatePicker v-model="cal1" size='mini'></TyDatePicker>
<hr>
<TyDatePicker v-model="cal1" size='small'></TyDatePicker>
<hr>
<TyDatePicker v-model="cal1" size='medium'></TyDatePicker>
<hr>
<TyDatePicker v-model="cal1" size='large'></TyDatePicker>

```
```js
import { ref } from 'vue'
const cal1 = ref('')
```
:::

<script setup>
import { ref } from 'vue'
const cal1 = ref('')

</script>


## 属性(Attributes)

<div class="listTb">

| 属性        | 描述                           | 类型     | 值                        | 默认          |
| ----------- | ------------------------------ | -------- | ------------------------- | ------------- |
| size        | 组件大小                       | string   | mini/ small/ medium/ mini | mini          |
| clearable   | 是否展示清除按钮               | boolean  | --                        | true          |
| placeholder | 占位符                         | string   | --                        | --            |
| disabled    | 是否禁用                       | boolean  | --                        | false         |
| readonly    | 是否只读                       | boolean  | --                        | false         |
| modelValue  | v-model 绑定值(required)       | string   | number                    | ''            |
| format      | 格式化展示(仅用于展示)如 yyyy-MM-dd         | String | --  | =|

</div>