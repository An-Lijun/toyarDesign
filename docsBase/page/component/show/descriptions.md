# 描述列表

## 基础用法

:::demo 基础用法

```html
<TyDescriptions
  title="User Info"
  border
  :data="[
      {
        label: 'Name',
        value: 'Socrates',
      }, {
        label: 'Mobile',
        value: '123-1234-1234',
      }, {
        label: 'Residence',
        value: 'Beijing'
      }, {
        label: 'Hometown',
        value: 'Beijing',
      }, {
        label: 'Address',
        value: 'Yingdu Building, Zhichun Road, Beijing'
      }
    ]"
/>
```

:::

## 无边框

:::demo 基础用法

```html
<TyDescriptions
  title="User Info"
  :data="[
      {
        label: 'Name',
        value: 'Socrates',
      }, {
        label: 'Mobile',
        value: '123-1234-1234',
      }, {
        label: 'Residence',
        value: 'Beijing'
      }, {
        label: 'Hometown',
        value: 'Beijing',
      }, {
        label: 'Address',
        value: 'Yingdu Building, Zhichun Road, Beijing'
      }
    ]"
/>
```

:::

## 调整布局

:::demo 基础用法

```html
<TyDescriptions
  layout="row"
  size="mini"
  title="User Info"
  :data="[
      {
        label: 'Name',
        value: 'Socrates',
      }, {
        label: 'Mobile',
        value: '123-1234-1234',
      }, {
        label: 'Residence',
        value: 'Beijing'
      }, {
        label: 'Hometown',
        value: 'Beijing',
      }, {
        label: 'Address',
        value: 'Yingdu Building, Zhichun Road, Beijing'
      }
    ]"
/>
```

:::

## 调整大小

:::demo 基础用法

```html
<TyDescriptions
  size="small"
  layout="row"
  title="User Info"
  :data="[
      {
        label: 'Name',
        value: 'Socrates',
      }, {
        label: 'Mobile',
        value: '123-1234-1234',
      }, {
        label: 'Residence',
        value: 'Beijing'
      }, {
        label: 'Hometown',
        value: 'Beijing',
      }, {
        label: 'Address',
        value: 'Yingdu Building, Zhichun Road, Beijing'
      }
    ]"
/>
<TyDescriptions
  size="medium"
  layout="row"
  title="User Info"
  :data="[
      {
        label: 'Name',
        value: 'Socrates',
      }, {
        label: 'Mobile',
        value: '123-1234-1234',
      }, {
        label: 'Residence',
        value: 'Beijing'
      }, {
        label: 'Hometown',
        value: 'Beijing',
      }, {
        label: 'Address',
        value: 'Yingdu Building, Zhichun Road, Beijing'
      }
    ]"
/>
<TyDescriptions
  size="large"
  layout="row"
  title="User Info"
  :data="[
      {
        label: 'Name',
        value: 'Socrates',
      }, {
        label: 'Mobile',
        value: '123-1234-1234',
      }, {
        label: 'Residence',
        value: 'Beijing'
      }, {
        label: 'Hometown',
        value: 'Beijing',
      }, {
        label: 'Address',
        value: 'Yingdu Building, Zhichun Road, Beijing'
      }
    ]"
/>
```

:::

## 调整对齐方式

:::demo 基础用法

```html
<TyDescriptions
  size="large"
  align="left"
  layout="row"
  title="User Info"
  :data="[
      {
        label: 'Name',
        value: 'Socrates',
      }, {
        label: 'Mobile',
        value: '123-1234-1234',
      }, {
        label: 'Residence',
        value: 'Beijing'
      }, {
        label: 'Hometown',
        value: 'Beijing',
      }, {
        label: 'Address',
        value: 'Yingdu Building, Zhichun Road, Beijing'
      }
    ]"
/>
<TyDescriptions
  align="center"
  size="large"
  layout="row"
  title="User Info"
  :data="[
      {
        label: 'Name',
        value: 'Socrates',
      }, {
        label: 'Mobile',
        value: '123-1234-1234',
      }, {
        label: 'Residence',
        value: 'Beijing'
      }, {
        label: 'Hometown',
        value: 'Beijing',
      }, {
        label: 'Address',
        value: 'Yingdu Building, Zhichun Road, Beijing'
      }
    ]"
/>
<TyDescriptions
  align="right"
  size="large"
  layout="row"
  title="User Info"
  :data="[
      {
        label: 'Name',
        value: 'Socrates',
      }, {
        label: 'Mobile',
        value: '123-1234-1234',
      }, {
        label: 'Residence',
        value: 'Beijing'
      }, {
        label: 'Hometown',
        value: 'Beijing',
      }, {
        label: 'Address',
        value: 'Yingdu Building, Zhichun Road, Beijing'
      }
    ]"
/>
```

:::

## 调整布局

:::demo 基础用法

```html
<TyDescriptions
  :border="true"
  align="right"
  size="small"
  layout="row"
  title="User Info"
  :data="[
      {
        label: 'Name',
        value: 'Socrates',
      }, {
        label: 'Mobile',
        value: '123-1234-1234',
      }, {
        label: 'Residence',
        value: 'Beijing'
      }, {
        label: 'Hometown',
        value: 'Beijing',
      }, {
        label: 'Address',
        value: 'Yingdu Building, Zhichun Road, Beijing'
      }
    ]"
/>
```

:::

## 属性(Attributes)

<div class="listTb">

| 属性   | 描述           | 类型    | 默认   |
| ------ | -------------- | ------- | ------ |
| title  | 表格标题       | string  | info   |
| data   | 表格数据       | Array   | ''     |
| column | 表格列数       | number  | 3      |
| size   | 表格大小       | string  | small  |
| align  | 表格列对齐方式 | string  | left   |
| layout | 表格布局       | string  | column |
| border | 是否展示边框   | Boolean | false  |

</div>

## 变量(cssVariables)

<div class="cssVar">

| 变量名            | 变量值 | 描述             |
| ----------------- | ------ | ---------------- |
| --color-bg-1       | 4px    | 表格背景色 |
| --margin-4       | 4px    | 表格标题下的距离 |
| --font-title-1 | 16px    | 表格标题大小             |
| --text-1          |        | 标题/内容文字颜色     |
| --text-2          |        | 内容文字颜色     |
| --text-3          |        | 内容label颜色     |
| --border-color-2          |        | 边框色     |
| --fill-2         |        | label背景色    |


</div>
