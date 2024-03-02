# Col 栅格列

## 基础用法

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

## 属性(Attributes)

<div class="listTb">

| 属性   | 描述                           | 类型   | 值  | 默认 |
| ------ | ------------------------------ | ------ | --- | ---- |
| span   | 栅格列占一行的分数一行为 24 份 | Number | 0   |
| offset | 栅格列向右偏移多少份           | Number | 0   |

</div>

## 插槽(slot)

<div class="listTb">

| 名称    | 描述     |
| ------- | -------- |
| default | 默认插槽 |

</div>
