# caution

## 基础用法

:::demo 基础用法

```html
  <ty-caution title="title">
        info
    </ty-caution>
    <ty-caution title="title" type="success">
        info
    </ty-caution>
    <ty-caution title="title" type="warning">
        info
    </ty-caution>
    <ty-caution title="title" type="error">
        info
    </ty-caution>

```
:::

## 不展示图标

:::demo 基础用法

```html
    <ty-caution title="title" :isShowIcon="false">
        info
    </ty-caution>
    <ty-caution title="title" type="success" :isShowIcon="false">
        info
    </ty-caution>
    <ty-caution title="title" type="warning" :isShowIcon="false">
        info
    </ty-caution>
    <ty-caution title="title" type="error" :isShowIcon="false">
        info
    </ty-caution>

```
:::

## 单行文本

:::demo 基础用法

```html
    <ty-caution title="title" >
    </ty-caution>
    <ty-caution title="title" type="success">
    </ty-caution>
    <ty-caution title="title" type="warning" >
    </ty-caution>
    <ty-caution title="title" type="error">
    </ty-caution>
```
:::

## 插槽(Slot)

<div class="listTb">

| 插槽名  | 描述                   | 
| ----- | ---------------------- |
| default | 组件内容 |
</div>

## 属性(Attributes)

<div class="listTb">

| 属性  | 描述                   | 类型   | 默认 |
| ----- | ---------------------- | ------ | ---- |
| type | 组件的类型             | string | info|
| title | 组件标题 | string | ''   |
| isShowIcon | 是否展示Icon | Boolean | true  |

</div>

## 变量(cssVariables)

<div class="cssVar">

| 变量名                 | 变量值 | 描述               |
| ---------------------- | ------ | ------------------ |
| --padding-4         | 4px    | 内容上下padding             |
| --padding-6         | 6px    | 内容左右padding             |
| --border-radius-4      | 4px    | 圆角               |
| --text-1 |    | 标题文字颜色 |
| --text-2 |     | 内容文字颜色 |

</div>