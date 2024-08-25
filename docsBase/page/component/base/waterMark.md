# waterMark 水印

## 基本用法

:::demo

```html
<TyWaterMark markInfo="TyDesign">
  <TyTable :columns="columns" :data="tableData"> </TyTable>
</TyWaterMark>
```

:::

## 多行文本

:::demo

```html
<TyWaterMark :markInfo="['TyDesign',time]" :options="{width:300,height:300}">
  <TyTable :columns="columns" :data="tableData"> </TyTable>
</TyWaterMark>
```

:::

## 图片水印

:::demo

```html
<TyWaterMark markInfo="/toyar.png" :options="{width:400,height:100,rotate:0}">
  <TyTable :columns="columns" :data="tableData"> </TyTable>
</TyWaterMark>
```

:::

## 修改配置

:::demo

```html
<TyWaterMark
  markInfo="TyDesign"
  :options="{
  fontColor:'red',
  fontSize:20,
  fontFamily: 'Arial',
  zIndex:80,
  width: 150,
  height: 150,
  rotate:0
}"
>
  <TyTable :columns="columns" :data="tableData"> </TyTable>
</TyWaterMark>
```

:::

## 属性(Attributes)

<div class="listTb">

| 属性               | 描述              | 类型                          | 值    | 默认                   |
| ------------------ | ----------------- | ----------------------------- | ----- | ---------------------- |
| markInfo           | 水印的填充内容    | string(required)或 Array[a,b] | --    | --                     |
| options.fontColor  | 水印的文字颜色    | string                        | --    | rgba(210,210,230,0.7)  |
| options.fontSize   | 水印的文字大小    | string                        | --    | 30                     |
| options.fontSizeSed | 第二行水印的文字大小 | string                        | --    | 30                     |
| options.fontFamily | 水印的文字字体    | string                        | --    | Arial                  |
| options.zIndex     | 水印的层级        | string/ number                | --    | '999'                  |
| options.width      | 一块水印的 width  | string                        | --    | 200                    |
| options.height      | 一块水印的 height | string/number                 | 0-180 | (-30 \* Math.PI) / 180 |
| options.rotate     | 水印的角度        | string                        | --    | none                   |
| options.offsetX    | 水印的偏移量 x    | string/number                 | --    | 0                      |
| options.offsetY    | 水印的偏移量 y    | string/number                 | --    | 0                      |
| options.antiTamper | 防止水印被篡改    | boolean                       | --    | false                  |

</div>

<script setup>
  const day =new Date()
  const time =`${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`
  const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
]
const tableData = [
  {
    name: '张三',
    age: '18',
    address: '南京'
  },
  {
    name: '李四',
    age: '18',
    address: '上海'
  },
  {
    name: '张二麻子',
    age: '18',
    address: '长春'
  },
    {
    name: '张二麻子',
    age: '18',
    address: '长春'
  },
    {
    name: '张二麻子',
    age: '18',
    address: '长春'
  },
    {
    name: '张二麻子',
    age: '18',
    address: '长春'
  },
]
</script>
