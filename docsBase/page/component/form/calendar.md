# calendar

## 基本用法

:::demo

```html
<div>{{cal1}}</div>
<TyCalendar v-model="cal1"></TyCalendar>
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
<TyCalendar v-model="cal1" placeholder='请选择'></TyCalendar>
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
<TyCalendar v-model="cal1" placeholder='请选择' format='yyyy年MM月dd日'></TyCalendar>
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
<TyCalendar v-model="cal1" disabled></TyCalendar>
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
  <TyCalendar v-model="cal1" ></TyCalendar>
</TyFormItem>
</TyForm>
<hr>
<TyForm disabled>
  <TyFormItem >
  <TyCalendar v-model="cal1" ></TyCalendar>
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
<TyCalendar v-model="cal1" readonly></TyCalendar>
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
  <TyCalendar v-model="cal1" ></TyCalendar>
</TyFormItem>
</TyForm>
<hr>
<TyForm size='mini'>
  <TyFormItem >
  <TyCalendar v-model="cal1" ></TyCalendar>
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
<TyCalendar v-model="cal1" size='mini'></TyCalendar>
<hr>
<TyCalendar v-model="cal1" size='small'></TyCalendar>
<hr>
<TyCalendar v-model="cal1" size='medium'></TyCalendar>
<hr>
<TyCalendar v-model="cal1" size='large'></TyCalendar>

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