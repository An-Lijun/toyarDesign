# Icon 字体图标

## 基础用法

:::demo 基础用法

```html
<ty-icon icon="toyar ty-arrow-up-circle-fill" class="mw-10"></ty-icon>
<ty-icon icon="toyar ty-arrow-down-circle-fill" class="mw-10"></ty-icon>
<ty-icon icon="toyar ty-arrow-right-circle-fill" class="mw-10"></ty-icon>
<ty-icon icon="toyar ty-arrow-left-circle-fill" class="mw-10"></ty-icon>
```

:::

## 修改颜色(color)

:::demo 修改颜色

```html
<ty-icon color="red" icon="ty-arrow-up-circle-fill" class="mw-10"></ty-icon>
<ty-icon
  color="yellow"
  icon="ty-arrow-down-circle-fill"
  class="mw-10"
></ty-icon>
<ty-icon
  color="green"
  icon="ty-arrow-right-circle-fill"
  class="mw-10"
></ty-icon>
<ty-icon color="blue" icon="ty-arrow-left-circle-fill" class="mw-10"></ty-icon>
```

:::

## 修改颜色(style)

:::demo 修改颜色

```html
<ty-icon
  style="color:red"
  icon="ty-arrow-up-circle-fill"
  class="mw-10"
></ty-icon>
<ty-icon
  style="color:yellow"
  icon="ty-arrow-down-circle-fill"
  class="mw-10"
></ty-icon>
<ty-icon
  style="color:green"
  icon="ty-arrow-right-circle-fill"
  class="mw-10"
></ty-icon>
<ty-icon
  style="color:blue"
  icon="ty-arrow-left-circle-fill"
  class="mw-10"
></ty-icon>
```

:::

## 修改大小(size)

:::demo size 控制图标大小(默认 1em)单位 px

```html
<ty-icon :size="15" icon="ty-arrow-up-circle-fill" class="mw-10"></ty-icon>
<ty-icon :size="20" icon="ty-arrow-down-circle-fill" class="mw-10"></ty-icon>
<ty-icon :size="25" icon="ty-arrow-right-circle-fill" class="mw-10"></ty-icon>
<ty-icon :size="30" icon="ty-arrow-left-circle-fill" class="mw-10"></ty-icon>
```

:::

## 继承颜色

:::demo 继承颜色

```html
<div style="color:red">
  <ty-icon
    style="color:red"
    icon="ty-arrow-up-circle-fill"
    class="mw-10"
  ></ty-icon>
  <ty-icon icon="ty-arrow-down-circle-fill" class="mw-10"></ty-icon>
</div>
```

:::

## 继承大小

:::demo 继承大小

```html
<div style="font-size:50px">
  <ty-icon
    style="color:red"
    icon="ty-arrow-up-circle-fill"
    class="mw-10"
  ></ty-icon>
  <ty-icon icon="ty-arrow-down-circle-fill" class="mw-10"></ty-icon>
</div>
```

:::

## 属性(Atttybutes)

<div class="listTb">

| 属性  | 描述         | 类型   | 值  | 默认      |
| ----- | ------------ | ------ | --- | --------- |
| icon  | 字体图标类名 | string | --  | ""        |
| size  | 字体图标大小 | number | --  | 1em       |
| color | 字体图标颜色 | string | --  | 'inherit' |

</div>

## 变量(cssVatyables)

<div class="cssVar">

| 变量名          | 变量值                     | 描述         |
| --------------- | -------------------------- | ------------ |
| --toyar-gray-10 | light-#1D2129/dark-#F6F6F6 | 字体图标颜色 |

</div>
