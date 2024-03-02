# Divider 分隔线

## 基础用法
:::demo  基础用法(state)
```html
<div class="mt-10">
  <ty-divider></ty-divider>
  </div>
<div class="mt-10">
<ty-divider>
  <ty-icon icon="ty-arrow-up-circle-fill" class="mw-10"></ty-icon>
</ty-divider>
</div>


```
:::


## 常用

:::demo  常用
```html
<div style="height:25px;display:flex;justify-content:center">
  
  <TyButton>新增</TyButton>   <ty-divider style="--border-1:2px" direction="column"></ty-divider>  <TyButton type="secondary">修改</TyButton>
  <ty-divider style="--border-1:2px" direction="column"></ty-divider>  <TyButton state="danger">删除</TyButton>
</div>
```
:::


## 分隔线方向(direction)

:::demo  基础用法(state)
```html
<ty-divider ></ty-divider>
<div style="height:50px;display:flex;justify-content:center">
  <ty-divider direction="column"></ty-divider>
</div>
```
:::

## 携带内容(default slot)

:::demo  基础用法(state)
```html
<ty-divider >Toyar</ty-divider>
<div style="height:50px;display:flex;justify-content:center">
  <ty-divider direction="column">Toyar</ty-divider>
</div>
```
:::

## 内容位置(position)

:::demo  基础用法(state)
```html
<ty-divider position="left">Toyar</ty-divider>
<ty-divider position="center">Toyar</ty-divider>
<ty-divider position="right">Toyar</ty-divider>

<div style="height:100px;display:flex;justify-content:center">
  <ty-divider direction="column" position="top">Toyar</ty-divider>
  <ty-divider direction="column" position="center">Toyar</ty-divider>
  <ty-divider direction="column"  position="bottom">Toyar</ty-divider>

</div>
```
:::

## 属性(Attributes)
<div class="listTb">

| 属性      | 描述    | 类型      | 值       | 默认   |
|----- |----- |----- |----- |-----  |
| direction | 分割线的方向  | string  | row / column  | row
| position | 分割线的方向  | string  | center / left / right /bottom / top  | center

</div>


## 插槽(slot)
<div class="listTb">

| 名称      | 描述    |
|----- |----- |
| default | 默认插槽 |

</div>


## 变量(cssVariables)

<div class="cssVar">

| 变量名      | 变量值    | 描述 |
|----- |----- |----- |
| --color-bg-1 | -- | 分隔线内容的背景颜色 |
| --font-weight-5 | -- | 分隔线内容的font-weight |
| --toyar-gray-10 | -- | 分隔线内容的color |
| --font-body-3 | -- | 分隔线内容的font-size |
| --padding-2 | -- | 分隔线内容的padding |
| --toyar-gray-2 | -- | 分隔线内容的颜色 |
| --border-1 | -- | 分隔线内容的粗细 |
| --padding-2 | -- | 分隔线外侧的margin  |

</div>
