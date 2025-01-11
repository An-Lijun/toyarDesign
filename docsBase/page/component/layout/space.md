# 间距 Space
设置组件之间的间距

## 基本用法
间距组件的基本用法。
:::demo 
```html
<TySpace>
  <TyButton>按钮</TyButton>
  <TyButton type="secondary">按钮</TyButton>

</TySpace>
```
:::

## 垂直间距
可以设置垂直方向排列的间距。
:::demo 
```html
<TySpace direction="column">
  <TyButton block>按钮</TyButton>
  <TyButton type="secondary" block>按钮</TyButton>
</TySpace>
```
:::

## 尺寸
内置 4 个尺寸，mini - 4px small - 8px (默认) medium - 16px large - 24px，也支持传数字来自定义尺寸。
:::demo 
```html
<TySpace direction="column" size="mini">
  <TyButton block>按钮</TyButton>
  <TyButton type="secondary" block>按钮</TyButton>
</TySpace>
<br>
<br>

<TySpace direction="column" size="small">
  <TyButton block>按钮</TyButton>
  <TyButton type="secondary" block>按钮</TyButton>
</TySpace>
<br>
<br>
<TySpace direction="column" size="medium">
  <TyButton block>按钮</TyButton>
  <TyButton type="secondary" block>按钮</TyButton>
</TySpace>
<br>
<br>
<TySpace direction="column" size="large">
  <TyButton block>按钮</TyButton>
  <TyButton type="secondary" block>按钮</TyButton>
</TySpace>

自定义尺寸
<TySpace direction="column" size="30">
  <TyButton block>按钮</TyButton>
  <TyButton type="secondary" block>按钮</TyButton>
</TySpace>
```
:::

## 对齐
:::demo 
```html
<TySpace justify="center">
  <TyButton >按钮</TyButton>
  <TyButton type="secondary" >按钮</TyButton>
</TySpace>
```
:::

## 属性(Attributes)

<div class="listTb">

| 属性    | 描述             | 类型   | 值                              | 默认  |
| ------- | ---------------- | ------ | ------------------------------- | ----- |
| justify  | 对齐方式 | String |  start/center/end/                              | start     |
| align | 对齐方式   | Strong | start/center/end/ | center |
| direction |  间距方向  | String | row/column | row |
| size | 间距大小，支持分别制定横向和竖向的间距   | String | number/ mini / small /medium / large  | small |


</div>