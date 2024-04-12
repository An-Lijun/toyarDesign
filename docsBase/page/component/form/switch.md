# switch

## 基本使用

:::demo

```html
{{isSwitch}} <TySwitch v-model="isSwitch" size="mini" />
```

```JavaScript
  const isSwitch = ref(false)
```
:::

## size

:::demo

```html
{{isSwitch}} <TySwitch v-model="isSwitch" size="mini" />
<TySwitch v-model="isSwitch" size="small" />
<TySwitch v-model="isSwitch" size="medium" />
<TySwitch v-model="isSwitch" size="large" />
```

```JavaScript
  const isSwitch = ref(false)
```

:::

## 更改默认值

:::demo

```html
{{isSwitch1}}
<TySwitch v-model="isSwitch1" openValue="1" closeValue="2" size="mini" />
```

```JavaScript
  const isSwitch1 = ref('1')
```

:::

## 更改类型

:::demo

```html
{{isSwitch1}}
<TySwitch v-model="isSwitch1" openValue="1" closeValue="2" size="mini" />
<TySwitch
  v-model="isSwitch1"
  openValue="1"
  type="inline"
  closeValue="2"
  size="mini"
/>
<TySwitch
  v-model="isSwitch1"
  openValue="1"
  type="tube"
  closeValue="2"
  size="mini"
/>
```

```JavaScript
  const isSwitch1 = ref('1')
```

:::

## 添加开关描述

:::demo

```html
{{isSwitch1}}
<TySwitch
  v-model="isSwitch1"
  openValue="1"
  type="tube"
  closeValue="2"
  size="mini"
  uncheckedText="off"
  checkedText="on"
/>
```

```JavaScript
  const isSwitch1 = ref('1')
```

:::

## disabled

:::demo

```html
{{isSwitch1}}
<TySwitch
  disabled
  v-model="isSwitch1"
  openValue="1"
  type="tube"
  closeValue="2"
  size="mini"
  uncheckedText="off"
  checkedText="on"
/>
```

```JavaScript
  const isSwitch1 = ref('1')
```
:::


## 事件

:::demo

```html
{{isSwitch1}}
<TySwitch
  @change="(value)=>{console.log(value)}"
  v-model="isSwitch1"
  openValue="1"
  type="tube"
  closeValue="2"
  size="mini"
  uncheckedText="off"
  checkedText="on"
/>
```

```JavaScript
  const isSwitch1 = ref('1')
```
:::

## 属性(Attributes)

<div class="listTb">

| 属性          | 描述           | 类型           | 值                        | 默认    |
| ------------- | -------------- | -------------- | ------------------------- | ------- |
| size          | 组件大小       | string         | mini/ small/ medium/ mini | mini    |
| type          | 组件类型       | string         | round/ tube/ inline/      | 'round' |
| uncheckedText | 组件未选中描述 | string         | --                        | ''      |
| disabled      | 禁用           | boolean        | --                        | false   |
| checkedText   | 组件选中描述   | string         | --                        | ''      |
| openValue     | 组件打开值     | string/Boolean | --                        | true    |
| closeValue    | 组件打开值     | string/Boolean | --                        | false   |

</div>

<script setup>
import { ref } from 'vue'

  const isSwitch = ref(false)
  const isSwitch1 = ref('1')

  </script>
  <!-- 
  <hr>
  {{ isSwitch1 }}
  <TySwitch v-model="isSwitch1" openValue="1" closeValue="2" size="small"/>

  <TySwitch v-model="isSwitch" type="tube" size="medium"/>TyLoading
  <hr>

  <TySwitch  v-model="isSwitch1" openValue="1" closeValue="2" type="inline" size="large"/> -->
