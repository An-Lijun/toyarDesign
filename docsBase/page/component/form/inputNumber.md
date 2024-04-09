# inputNumber

## 基础用法

:::demo

```html
<TyInputNumber v-model="inp" />
```

```js
import { ref } from 'vue'
const inp = ref('')
```

:::

## 尺寸

:::demo

```html
<div v-for="item in ['mini','small','medium','large']">
  <TyInputNumber v-model="inp" :size="item" />
  <hr />
</div>
```

```js
import { ref } from 'vue'
const inp = ref('')
```

:::

## 禁用

:::demo

```html
<TyInputNumber v-model="inp" disabled />
```

```js
import { ref } from 'vue'
const inp = ref('')
```

:::

## 只读

:::demo

```html
<TyInputNumber v-model="inp" readonly />
```

```js
import { ref } from 'vue'
const inp = ref('')
```

:::

## placeholder

:::demo

```html
<TyInputNumber v-model="inp" readonly placeholder="请输入" />
```

```js
import { ref } from 'vue'
const inp = ref('')
```

:::

## maxlength

:::demo

```html
<TyInputNumber v-model="inp" maxlength="5" />

<hr />
<TyInputNumber v-model="inp" :maxlength="{int:5,doub:2}" />
```

```js
import { ref } from 'vue'
const inp = ref('')
```

:::

## step

:::demo

```html
<TyInputNumber v-model="inp" :step="5" />
```

```js
import { ref } from 'vue'
const inp = ref('')
```

:::

## step 严格

:::demo

```html
<TyInputNumber stepStrictly v-model="inp" :step="5" />
```

```js
import { ref } from 'vue'
const inp = ref('')
```

:::

## precision 精度

:::demo

```html
<TyInputNumber v-model="inp13" :precision="0" />
<hr />
<TyInputNumber v-model="inp1" :precision="2" />
<br />
<TyInputNumber stepStrictly :step="0.01" v-model="inp1" :precision="2" />
<hr />
注意: precision 和 stepStrictly 同时开启时以 precision为标准
```

```js
import { ref } from 'vue'
const inp1 = ref('')
const inp13 = ref('')
```

:::

## format

:::demo

```html
<TyInputNumber
  stepStrictly
  :step="0.01"
  :format="formatFn"
  v-model="inp3"
  :precision="2"
/>
<hr />
注意: 基于input 的format 函数形式
```

```js
import { ref } from 'vue'

const inp3 = ref('')
function formatFn(input) {
  let dotArr = ['角', '分'] // '厘', '毫', '丝'
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

## 属性(Attributes)

<div class="listTb">

| 属性         | 描述                                                   | 类型                                | 值                        | 默认          |
| ------------ | ------------------------------------------------------ | ----------------------------------- | ------------------------- | ------------- |
| modelValue   | v-model 绑定值(required)                               | string                              | number                    | ''            |
| size         | 组件大小                                               | string                              | mini/ small/ medium/ mini | mini          |
| clearable    | 是否展示清除按钮                                       | boolean                             | --                        | true          |
| maxlength    | 最大可输入长度当为 Object 则精确控制证书和小数部分长度 | number/'Object{int:Xxx,doub:xxx}  '   | --                        | --            |
| placeholder  | 占位符                                                 | string                              | --                        | --            |
| disabled     | 是否禁用                                               | boolean                             | --                        | false         |
| readonly     | 是否只读                                               | boolean                             | --                        | false         |
| format       | 格式化展示(仅用于展示)                                 | Function                            | --                        | value=> value |
| step         | 每次+-按钮增加或删除的步长                             | number                              | --                        | 1             |
| stepStrictly | 是否开启严格步长意味着手动输入时也要是步长的倍数       | boolean                             | --                        | false         |
| precision    | 精度 当步长严格和精度同时存在时以精度为准              | 保留小数点后几位如果是整数则默认.00 | --                        | --            |

</div>

<script setup>
import { ref } from 'vue'
const inp = ref('')
const inp1 = ref('')
const inp3 = ref('');
const inp13 = ref('')

function formatFn(input){
  let dotArr = ['角', '分'] // '厘', '毫', '丝'
  let digitArr = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let unitArr = [
    ['', '拾', '佰', '仟'],
    ['', '万', '亿', '兆']
  ]
  let num = String(input).trim()
  let intStr = '',
    dotStr = '' //记录整数字符串 记录小数字符串
  let head='';
  if( num[0] == '-'){
    head="负";
    num=num.slice(1);
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
