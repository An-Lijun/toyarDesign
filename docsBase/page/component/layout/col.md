# Col 栅格列

## 基础用法
展示了最基本的 24 等分应用。
:::demo 基础用法

```html
<div class="sg-container">
  <ty-row :gutter="16">
    <ty-col :span="8">
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="8">
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="8">
      <div class="colBox"></div>
    </ty-col>
  </ty-row>
  <div class="mb-10 mt-10">
    <ty-row :gutter="16">
      <ty-col :span="12">
        <div class="colBox"></div>
      </ty-col>
      <ty-col :span="12">
        <div class="colBox"></div>
      </ty-col>
    </ty-row>
  </div>
  <ty-row :gutter="16">
    <ty-col :span="6">
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="6">
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="6">
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="6">
      <div class="colBox"></div>
    </ty-col>
  </ty-row>
  <div class="mt-10">
    <ty-row :gutter="16">
      <ty-col :span="4">
        <div class="colBox"></div>
      </ty-col>
      <ty-col :span="4">
        <div class="colBox"></div>
      </ty-col>
      <ty-col :span="4">
        <div class="colBox"></div>
      </ty-col>
      <ty-col :span="4">
        <div class="colBox"></div>
      </ty-col>
      <ty-col :span="4">
        <div class="colBox"></div>
      </ty-col>
      <ty-col :span="4">
        <div class="colBox"></div>
      </ty-col>
    </ty-row>
  </div>
</div>
```

:::

## 修改列占份数(span)

:::demo gutter

```html
<div class="sg-container">
  <ty-row :gutter="16">
    <ty-col :span="4">
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="6">
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="12">
      <div class="colBox"></div>
    </ty-col>
  </ty-row>
  <div class="mb-10 mt-10">
    <ty-row :gutter="16">
      <ty-col :span="10">
        <div class="colBox"></div>
      </ty-col>
      <ty-col :span="4">
        <div class="colBox"></div>
      </ty-col>
      <ty-col :span="10">
        <div class="colBox"></div>
      </ty-col>
    </ty-row>
  </div>
  <ty-row :gutter="16">
    <ty-col :span="2">
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="10">
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="10">
      <div class="colBox"></div>
    </ty-col>
  </ty-row>
</div>
```

:::

## 修改偏移份数(offset)
指定 offset 可以对栅格进行平移操作。
:::demo gutter

```html
<div class="sg-container">
  <div class="mb-10">
    <ty-row :gutter="16">
      <ty-col :span="4" :offset="10">
        <div class="colBox"></div>
      </ty-col>
      <ty-col :span="6" :offset="4">
        <div class="colBox"></div>
      </ty-col>
    </ty-row>
  </div>
  <ty-row :gutter="16">
    <ty-col :span="10" :offset="4">
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="4">
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="6">
      <div class="colBox"></div>
    </ty-col>
  </ty-row>
</div>
```

:::

## 响应式
预置五种响应尺寸, 分别为 xxl xl lg md sm。
:::demo gutter

```html
<div class="sg-container">
  <div class="mb-10">
    <ty-row :gutter="4">
      <ty-col
        :span="{
        xxl:4,
        xl:6,
        lg:8,
        md:12,sm:24
      }"
        style="margin-bottom:10px"
      >
        <div class="colBox"></div>
      </ty-col>
       <ty-col
        :span="{
        xxl:4,
        xl:6,
        lg:8,
        md:12,sm:24
      }"
        style="margin-bottom:10px"
      >
        <div class="colBox"></div>
      </ty-col>
       <ty-col
        :span="{
        xxl:4,
        xl:6,
        lg:8,
        md:12,sm:24
      }"
        style="margin-bottom:10px"
      >
        <div class="colBox"></div>
      </ty-col>
       <ty-col
        :span="{
        xxl:4,
        xl:6,
        lg:8,
        md:12,sm:24
      }"
        style="margin-bottom:10px"
      >
        <div class="colBox"></div>
      </ty-col>
       <ty-col
        :span="{
        xxl:4,
        xl:6,
        lg:8,
        md:12,sm:24
      }"
        style="margin-bottom:10px"
      >
        <div class="colBox"></div>
      </ty-col>
       <ty-col
        :span="{
        xxl:4,
        xl:6,
        lg:8,
        md:12,sm:24
      }"
        style="margin-bottom:10px"
      >
        <div class="colBox"></div>
      </ty-col>
    </ty-row>
  </div>
</div>
```

:::

## 属性(Attributes)

<div class="listTb">

| 属性   | 描述                           | 类型   | 值  | 默认 |
| ------ | ------------------------------ | ------ | --- | ---- |
| span   | 栅格列占一行的份数 最大24份 当为Object 时则可以配置响应式栅格 xxl屏幕大于1600px时,xl屏幕小于1600px 大于1200px时,lg 屏幕大于992小于1200px时,md屏幕大于768小于992时,sm屏幕小于768px时  | Number/Object | 0 |{}   |
| offset | 栅格列向右偏移多少份           | Number | 0   |

</div>

## 插槽(slot)

<div class="listTb">

| 名称    | 描述     |
| ------- | -------- |
| default | 默认插槽 |

</div>
