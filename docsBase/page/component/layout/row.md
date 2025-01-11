# Row 栅格行

## 基础用法
展示了最基本的 24 等分应用。
:::demo state 修改按钮类状态
```html
<div class="sg-container">
  <div class="mb-10 ">
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
  </div>
  <ty-row :gutter="16">
    <ty-col :span="12">
      <div class="colBox"></div>
    </ty-col>
    <ty-col :span="12">
      <div class="colBox"></div>
    </ty-col>
  </ty-row>
  <div class="mb-10 mt-10">
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
  </div>
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
```

:::

## 设置内部间距(gutter)
通过在 Row 上指定 gutter 可以增加栅格的区域间隔。
:::demo gutter

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
    <ty-row :gutter="32">
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
  </div>
  <ty-row :gutter="64">
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
</div>
```

:::

## 设置内部对齐方式(justify)
通过 justify 来进行水平布局。
:::demo gutter

```html
<div class="sg-container">
  <div class="mb-10">
    <ty-row :gutter="4" justify="center">
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
  </div>

  <div class="mb-10">
    <ty-row :gutter="4" justify="end">
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
  </div>

  <div class="mb-10">
    <ty-row :gutter="4" justify="around">
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
  </div>

  <div class="mb-10">
    <ty-row :gutter="4" justify="between">
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
  </div>
</div>
```

:::

## 设置内部对齐方式(align)
通过 align 来进行垂直布局。
:::demo gutter

```html
<div class="sg-container">
  <div class="mb-10">
    <ty-row :gutter="4" align="center">
      <ty-col :span="6">
        <div class="colBox"></div>
      </ty-col>
      <ty-col :span="6">
        <div class="colBox" style="height:80px"></div>
      </ty-col>
      <ty-col :span="6">
        <div class="colBox"></div>
      </ty-col>
    </ty-row>
  </div>

  <div class="mb-10">
    <ty-row :gutter="4" align="bottom">
      <ty-col :span="6">
        <div class="colBox"></div>
      </ty-col>
      <ty-col :span="6">
        <div class="colBox" style="height:80px"></div>
      </ty-col>
      <ty-col :span="6">
        <div class="colBox"></div>
      </ty-col>
    </ty-row>
  </div>

  <div class="mb-10">
    <ty-row :gutter="4" align="top">
      <ty-col :span="6">
        <div class="colBox"></div>
      </ty-col>
      <ty-col :span="6">
        <div class="colBox" style="height:80px"></div>
      </ty-col>
      <ty-col :span="6">
        <div class="colBox"></div>
      </ty-col>
    </ty-row>
  </div>
</div>
```

:::

## 属性(Attributes)

<div class="listTb">

| 属性    | 描述             | 类型   | 值                              | 默认  |
| ------- | ---------------- | ------ | ------------------------------- | ----- |
| gutter  | 栅格列之间的间距 | Number | --                              | 0     |
| justify | col 的左右对齐方式   | String | center/start/end/around/between | start |
| align | col 的上下对齐方式   | String | center/top/bottom | top |


</div>

## 插槽(slot)

<div class="listTb">

| 名称    | 描述     |
| ------- | -------- |
| default | 默认插槽 |

</div>
