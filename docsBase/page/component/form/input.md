# Input

## 基础用法

:::demo

```html
<TyInput v-model="inp" />
```

```js
import { ref } from 'vue'
const inp = ref('')
```

:::

## placeholder

:::demo(clearable,size)

```html
<TyInput v-model="inp" size="large" placeholder="请输入" />
```

## 属性

:::demo(clearable,size)

```html
<TyInput v-model="inp" :clearable="false" size="large" />
```

```js
import { ref } from 'vue'
const inp = ref('')
```

:::

## 外置元素

:::demo

```html
<TyInput v-model="inp" :clearable="false" outPreText="http" size="large" />

<hr />
<TyInput v-model="inp" :clearable="false">
  <template #outPre>
    <ty-button>btn</ty-button>
  </template>
</TyInput>
<hr />
<TyInput v-model="inp" :clearable="false" disabled>
  <template #outPre>
    <ty-button>btn</ty-button>
  </template>
</TyInput>
<hr />
<TyInput v-model="inp" :clearable="false" outAftText=".com" size="large" />

<hr />
<TyInput v-model="inp" :clearable="false">
  <template #outAft>
    <ty-button>
      <ty-icon color="#FFF" icon="ty-search-line" />
    </ty-button>
  </template>
</TyInput>
```

```js
import { ref } from 'vue'
const inp = ref('')
```

:::

## 内置元素

:::demo

```html
<TyInput v-model="inp">
  <template #innerPre>
    <ty-icon icon="ty-bluetooth-line" />
  </template>
</TyInput>
<hr />

<TyInput v-model="inp">
  <template #innerAft>
    <ty-icon icon="ty-search-line" />
  </template>
</TyInput>
```

```js
import { ref } from 'vue'
const inp = ref('')
```

:::

## 大小

:::demo

```html
<TyInput v-model="inp" size="mini"> </TyInput>
<hr />
<TyInput v-model="inp" size="small"> </TyInput>
<hr />
<TyInput v-model="inp" size="medium"> </TyInput>
<hr />
<TyInput v-model="inp" size="large"> </TyInput>
<hr />
```

```js
import { ref } from 'vue'
const inp = ref('')
```

:::

## 限制输入

:::demo

```html
<TyInput v-model="inp" maxlength="10" showLimit> </TyInput>
```

```js
import { ref } from 'vue'
const inp = ref('')
```
:::

## 事件

:::demo

```html
<TyInput v-model="inp" @enter="()=>{console.log('enter')}" @input="(val)=>{console.log(val)}" @clear="()=>{console.log('clear')}" @focus="()=>{console.log('focus')}" @blur="()=>{console.log('blur')}"> </TyInput>
```

```js
import { ref } from 'vue'
const inp = ref('')
```
:::

## 格式化展示

:::demo

```html
<TyInput v-model="inp" :format="numberToWords" maxlength="10" showLimit>
</TyInput>
```

```js
import { ref } from 'vue'
const inp = ref('')
function numberToWords(input) {
  let dotArr = ['角', '分'] //, '厘', '毫', '丝'
  let digitArr = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let unitArr = [
    ['', '拾', '佰', '仟'],
    ['', '万', '亿', '兆']
  ]
  let num = String(input).trim()
  let intStr = '',
    dotStr = '' //记录整数字符串 记录小数字符串
  let head = ''
  if (num[0] == '-') {
    head = '负'
    num = num.slice(1)
  }
  let [int = '', dot = ''] = num.split('.')
  int = int.slice(-12).split('').reverse().join('')
  dot = dot.slice(0, 2)
  if (!(int + dot).replace(/0+/g, '')) return '零元整'
  for (let i = 0; i < int.length; i++) {
    let unitIndex = Math.floor(i / 4) //获取 空万亿的索引
    let decadeIndex = i % 4 //获取个十百千的索引
    let cash = digitArr[int[i]]
    let unit = ''
    if (cash !== '零') {
      unit = unitArr[0][decadeIndex]
      if (intStr.indexOf(unitArr[1][unitIndex]) == -1) {
        unit += unitArr[1][unitIndex]
      }
    }
    intStr = cash + unit + intStr
  }
  intStr = intStr.replace(/零+/g, '零') + '元'
  intStr == '零元'
    ? (intStr = intStr.replace(/零元/, ''))
    : (intStr = intStr.replace(/零元/, '元'))
  if (dot.length > 0) {
    for (let i = 0; i < dotArr.length && dot[i]; i++) {
      if (intStr.length == 0 && i == 0 && dot[i] == '0') continue
      dotStr += digitArr[dot[i]]
      if (dot[i] != '0') {
        dotStr += dotArr[i]
      }
    }
  }
  dotStr =
    (dotStr.replace(/零+/g, '零') == '零'
      ? ''
      : dotStr.replace(/零+/g, '零')) || '整'
  return head + intStr + dotStr
}
```

:::

<script setup>
  import {ref} from 'vue'
 const inp =ref('')
function numberToWords(input) {
  let dotArr = ['角', '分'] //, '厘', '毫', '丝'
  let digitArr = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let unitArr = [
    ['', '拾', '佰', '仟'],
    ['', '万', '亿', '兆']
  ]
  let num = String(input).trim()
  let intStr = '',
    dotStr = '' //记录整数字符串 记录小数字符串
  let head = '';
  if (num[0] == '-') {
    head = "负";
    num = num.slice(1);
  }
  let [int = '', dot = ''] = num.split('.')
  int = int.slice(-12).split('').reverse().join('')
  dot = dot.slice(0, 2)
  if (!(int + dot).replace(/0+/g, '')) return '零元整'
  for (let i = 0; i < int.length; i++) {
    let unitIndex = Math.floor(i / 4) //获取 空万亿的索引
    let decadeIndex = i % 4 //获取个十百千的索引
    let cash = digitArr[int[i]]
    let unit = ''
    if (cash !== '零') {
      unit = unitArr[0][decadeIndex]
      if (intStr.indexOf(unitArr[1][unitIndex]) == -1) {
        unit += unitArr[1][unitIndex]
      }
    }
    intStr = cash + unit + intStr
  }
  intStr = intStr.replace(/零+/g, '零') + '元'
  intStr == '零元' ? (intStr = intStr.replace(/零元/, '')) : (intStr = intStr.replace(/零元/, '元'))
  if (dot.length > 0) {
    for (let i = 0; i < dotArr.length && dot[i]; i++) {
      if (intStr.length == 0 && i == 0 && dot[i] == '0') continue
      dotStr += digitArr[dot[i]]
      if (dot[i] != '0') {
        dotStr += dotArr[i]
      }
    }
  }
  dotStr = (dotStr.replace(/零+/g, '零') == '零' ? '' : dotStr.replace(/零+/g, '零')) || '整'
  return head + intStr + dotStr
}


</script>

## 属性(Attributes)

<div class="listTb">

| 属性        | 描述                           | 类型     | 值                        | 默认          |
| ----------- | ------------------------------ | -------- | ------------------------- | ------------- |
| size        | 组件大小                       | string   | mini/ small/ medium/ mini | mini          |
| clearable   | 是否展示清除按钮               | boolean  | --                        | true          |
| maxlength   | 最大可输入长度                 | number   | --                        | --            |
| placeholder | 占位符                         | string   | --                        | --            |
| disabled    | 是否禁用                       | boolean  | --                        | false         |
| readonly    | 是否只读                       | boolean  | --                        | false         |
| modelValue  | v-model 绑定值(required)       | string   | number                    | ''            |
| showLimit   | 是否展示输入数量配合 manlength | boolean  | --                        | false         |
| format      | 格式化展示(仅用于展示)         | Function | --                        | value=> value |
| outPreText  | 前置文字组件                   | string   | --                        | none          |
| outAftText  | 后置文字组件                   | string   | --                        | none          |

</div>

## 插槽(slot)

<div class="listTb">

| 名称     | 描述         |
| -------- | ------------ |
| outPre   | 前置元素     |
| innerPre | 前置内容元素 |
| innerAft | 后置内容元素 |
| outAft   | 后置元素     |

</div>



## 事件(emit)

<div class="listTb">

| 名称    | 描述         |
| ------- | ------------ |
| blur | 失焦 |
| focus | 聚焦 |
| enter | 回车 |
| clear | 清除 |
| input | 输入 |

</div>

