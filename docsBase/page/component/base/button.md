# Button 按钮

## 基础用法(state)

:::demo state 修改按钮类状态

```html
<ty-button class="mw-10">默认按钮</ty-button>
<ty-button state="danger" class="mw-10">危险按钮</ty-button>
<ty-button state="warning" class="mw-10">警告按钮</ty-button>
<ty-button state="success" class="mw-10">成功按钮</ty-button>
```

:::

## 按钮类型(type)

:::demo type 修改按钮类型

```html
<ty-button class="mw-10">默认按钮</ty-button>
<ty-button state="danger" class="mw-10">危险按钮</ty-button>
<ty-button state="warning" class="mw-10">警告按钮</ty-button>
<ty-button state="success" class="mw-10">成功按钮</ty-button>
<div class="mt-10">
  <ty-button type="secondary" class="mw-10">默认按钮</ty-button>
  <ty-button type="secondary" state="danger" class="mw-10">危险按钮</ty-button>
  <ty-button type="secondary" state="warning" class="mw-10">警告按钮</ty-button>
  <ty-button type="secondary" state="success" class="mw-10">成功按钮</ty-button>
</div>
<div class="mt-10">
  <ty-button type="dashed" class="mw-10">默认按钮</ty-button>
  <ty-button type="dashed" state="danger" class="mw-10">危险按钮</ty-button>
  <ty-button type="dashed" state="warning" class="mw-10">警告按钮</ty-button>
  <ty-button type="dashed" state="success" class="mw-10">成功按钮</ty-button>
</div>
<div class="mt-10">
  <ty-button type="text" class="mw-10">默认按钮</ty-button>
  <ty-button type="text" state="danger" class="mw-10">危险按钮</ty-button>
  <ty-button type="text" state="warning" class="mw-10">警告按钮</ty-button>
  <ty-button type="text" state="success" class="mw-10">成功按钮</ty-button>
</div>
<div class="mt-10">
  <ty-button type="link" class="mw-10">默认按钮</ty-button>
  <ty-button type="link" state="danger" class="mw-10">危险按钮</ty-button>
  <ty-button type="link" state="warning" class="mw-10">警告按钮</ty-button>
  <ty-button type="link" state="success" class="mw-10">成功按钮</ty-button>
</div>
```

:::

## 按钮禁用(disabled)

:::demo disabled 按钮禁用

```html
<ty-button disabled class="mw-10">默认按钮</ty-button>
<ty-button disabled type="secondary" state="danger" class="mw-10"
  >危险按钮</ty-button
>
<ty-button disabled type="dashed" state="warning" class="mw-10"
  >警告按钮</ty-button
>
<ty-button disabled type="text" state="success" class="mw-10"
  >成功按钮</ty-button
>
<ty-button disabled type="link" class="mw-10">默认按钮</ty-button>
```

:::

## 按钮大小(size)

:::demo size 控制按钮大小

```html
<ty-button size="mini" class="mw-10">默认按钮</ty-button>
<ty-button state="danger" class="mw-10">危险按钮</ty-button>
<ty-button size="medium" state="warning" class="mw-10">警告按钮</ty-button>
<ty-button size="large" state="success" class="mw-10">成功按钮</ty-button>
```

:::

## 按钮形状(shape)

:::demo shape 按钮圆角形状

```html
<ty-button class="mw-10"> 默认按钮 </ty-button>
<ty-button shape="round" class="mw-10"> 默认按钮 </ty-button>
<ty-button shape="circle" class="mw-10">
  <ty-icon icon="ty-add-fill" color="#fff" />
</ty-button>
<ty-button class="mw-10">
  <ty-icon icon="ty-add-fill" color="#fff" />
</ty-button>
```

:::

## 块级形状(block)

:::demo block 控制按钮是否充满一行

```html
<ty-button block>默认按钮</ty-button>
<ty-button class="mt-10" shape="round" block>默认按钮</ty-button>
```
:::


## loading

:::demo loading

```html
<ty-button @click="()=>{loading=!loading}">change</ty-button>
<hr />
<ty-button :loading="loading">默认按钮</ty-button>
```
:::


## 按钮组

:::demo buttonGrouop

```html
  <TyButtonGroup>
<ty-button >默认按钮A</ty-button>
<ty-button >默认按钮B</ty-button>
<ty-button >默认按钮C</ty-button>
  </TyButtonGroup>

<hr>
  <TyButtonGroup>
<ty-button > <TyIcon icon="ty-arrow-left-s-line"></TyIcon> last</ty-button>
<ty-button >  next <TyIcon icon="ty-arrow-right-s-line"></TyIcon></ty-button>

  </TyButtonGroup>
```
:::

## 属性(Attributes)

<div class="listTb">

| 属性     | 描述           | 类型    | 值                                        | 默认    |
| -------- | -------------- | ------- | ----------------------------------------- | ------- |
| state    | 按钮的状态     | string  | primary / success / warning / danger      | primary |
| type     | 按钮的类型     | string  | normal / secondary / dashed / text / link | normal  |
| size     | 按钮的大小     | string  | mini / small / medium / large             | small   |
| shape    | 按钮的圆角     | string  | square/round/circle                       | square  |
| disabled | 按钮是否禁用   | boolean | false/true                                | false   |
| block    | 是否是块级按钮 | boolean | false/true                                | false   |
| htmlType | html 原生 type | string  | button / submit / reset                   | button  |
| loading  | 是否加载       | Boolean | false/true                                | false   |

</div>

## 插槽(slot)

<div class="listTb">

| 名称    | 描述     |
| ------- | -------- |
| default | 默认插槽 |

</div>

## 变量(cssVariables)

<div class="cssVar">

| 变量名                 | 变量值 | 描述                                                                     |
| ---------------------- | ------ | ------------------------------------------------------------------------ |
| --time-1               | 0.1s   | 动画时间                                                                 |
| --font-weight-5        | 500    | font-weight                                                              |
| --border-1             | 1px    | border                                                                   |
| --font-body-3          | 1px    | font-size                                                                |
| --border-radius-4      | 4px    | border-radius                                                            |
| --text-0               | --     | normal 类型时 button 字体颜色                                            |
| --`state`-6            | --     | state 类型时 button 常规 背景色边框色                                    |
| --`state`-5            | --     | state 类型时 button hover/focus 背景色边框色                             |
| --`state`-7            | --     | state 类型时 button active 背景色边框色                                  |
| --`state`-3            | --     | state 类型时 button 禁用 背景色边框色 字体色(normal 字体色用的 --text-0) |
| --border-radius-square | 2px    | button 默认圆角                                                          |
| --border-radius-round  | 16px   | button 弧形圆角                                                          |
| --border-radius-circle | 50%    | 圆形                                                                     |
| --size-mini            | 24px   | 组件高度 size 为 mini                                                    |
| --size-samll           | 28px   | 组件高度 size 为 samll                                                   |
| --size-medium          | 32px   | 组件高度 size 为 medium                                                  |
| --size-large           | 36px   | 组件高度 size 为 large                                                   |
| --padding-1            | 11px   | 组件高度 size 为 mini                                                    |
| --padding-3            | 13px   | 组件高度 size 为 samll                                                   |
| --padding-3            | 13px   | 组件高度 size 为 medium                                                  |
| --padding-4            | 14px   | 组件高度 size 为 large                                                   |

</div>

<script setup>
  import {ref} from 'vue'
  let loading =ref(true)
</script>
