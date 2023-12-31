# Icon 字体图标

## 基础用法
:::demo  基础用法
```html
  <ty-icon icon="ri-arrow-up-circle-fill" class="mw-10"></ty-icon>
  <ty-icon icon="ri-arrow-down-circle-fill" class="mw-10"></ty-icon>
  <ty-icon icon="ri-arrow-right-circle-fill" class="mw-10"></ty-icon>
  <ty-icon icon="ri-arrow-left-circle-fill" class="mw-10"></ty-icon>

```
:::

## 修改颜色(color)
:::demo  修改颜色
```html
  <ty-icon color="red" icon="ri-arrow-up-circle-fill" class="mw-10"></ty-icon>
  <ty-icon color="yellow" icon="ri-arrow-down-circle-fill" class="mw-10"></ty-icon>
  <ty-icon color="green" icon="ri-arrow-right-circle-fill" class="mw-10"></ty-icon>
  <ty-icon color="blue"  icon="ri-arrow-left-circle-fill" class="mw-10"></ty-icon>

```
:::

## 修改颜色(style)
:::demo  修改颜色
```html
  <ty-icon style="color:red" icon="ri-arrow-up-circle-fill" class="mw-10"></ty-icon>
  <ty-icon style="color:yellow" icon="ri-arrow-down-circle-fill" class="mw-10"></ty-icon>
  <ty-icon style="color:green" icon="ri-arrow-right-circle-fill" class="mw-10"></ty-icon>
  <ty-icon style="color:blue"  icon="ri-arrow-left-circle-fill" class="mw-10"></ty-icon>
```
:::

## 修改大小(size)
:::demo  size控制图标大小(默认1em)单位px
```html
  <ty-icon size="15" icon="ri-arrow-up-circle-fill" class="mw-10"></ty-icon>
  <ty-icon size="20" icon="ri-arrow-down-circle-fill" class="mw-10"></ty-icon>
  <ty-icon size="25" icon="ri-arrow-right-circle-fill" class="mw-10"></ty-icon>
  <ty-icon size="30" icon="ri-arrow-left-circle-fill" class="mw-10"></ty-icon>
```
:::

## 属性(Attributes)
| 属性      | 描述    | 类型      | 值       | 默认   |
|----- |----- |----- |----- |-----  |
| icon  | 字体图标类名 | string | -- | ""
| size  | 字体图标大小 | number | -- | 0
| color  | 字体图标颜色 | string | -- | #1D2129


## 变量(cssVariables)

<div class="cssVar">

| 变量名      | 变量值    | 描述 |
|----- |----- |----- |
| --toyar-gray-10 | #1D2129 | 字体图标颜色 |
</div>