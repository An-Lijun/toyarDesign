# badge

## 基本用法

:::demo

```html
<TyBadge text="66" style="margin-right:30px">
  <TyButton>提交</TyButton>
</TyBadge>
```
:::

## 修改文字

:::demo

```html
<TyBadge text="HOT" max="15" style="margin-right:30px">
  <TyButton>提交</TyButton>
</TyBadge>
<TyBadge text="66" style="margin-right:30px">
  <TyButton>提交</TyButton>
</TyBadge>
<TyBadge text="666" style="margin-right:30px">
  <TyButton>提交</TyButton>
</TyBadge>
```

:::

## 最大值

:::demo

```html
<TyBadge text="50" max="15" style="margin-right:30px">
  <TyButton>提交</TyButton>
</TyBadge>
```

:::

## 点状

:::demo

```html
<TyBadge text="HOT" max="15" :dot="true" style="margin-right:30px">
  <TyButton>提交</TyButton>
</TyBadge>
```

:::

## 多种色彩

:::demo

```html
<div style="margin-top:20px">
  <TyBadge text="HOT" max="15" :dot="true" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
  <TyBadge text="HOT" max="15" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
  <TyBadge text="50" max="15" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
  <TyBadge text="66" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
  <TyBadge text="666" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
</div>
<div style="margin-top:20px">
  <TyBadge
    status="success"
    text="HOT"
    max="15"
    :dot="true"
    style="margin-right:30px"
  >
    <TyButton>提交</TyButton>
  </TyBadge>
  <TyBadge status="success" text="HOT" max="15" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
  <TyBadge status="success" text="50" max="15" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
  <TyBadge status="success" text="66" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
  <TyBadge status="success" text="666" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
</div>
<div style="margin-top:20px">
  <TyBadge
    status="warning"
    text="HOT"
    max="15"
    :dot="true"
    style="margin-right:30px"
  >
    <TyButton>提交</TyButton>
  </TyBadge>
  <TyBadge status="warning" text="HOT" max="15" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
  <TyBadge status="warning" text="50" max="15" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
  <TyBadge status="warning" text="66" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
  <TyBadge status="warning" text="666" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
</div>
<div style="margin-top:20px">
  <TyBadge
    status="primary"
    text="HOT"
    max="15"
    :dot="true"
    style="margin-right:30px"
  >
    <TyButton>提交</TyButton>
  </TyBadge>
  <TyBadge status="primary" text="HOT" max="15" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
  <TyBadge status="primary" text="50" max="15" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
  <TyBadge status="primary" text="66" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
  <TyBadge status="primary" text="666" style="margin-right:30px">
    <TyButton>提交</TyButton>
  </TyBadge>
</div>


```
:::


## 修改徽章内容
:::demo
```html
<div style="margin-top:20px">
  <TyBadge
    status="primary"
    max="15"
    style="margin-right:30px"
  >
    <TyButton>提交</TyButton>
    <template #icon>
      <TyIcon icon="ty-arrow-down-circle-fill" color="#fff"></TyIcon>

    </template>
  </TyBadge>
</div>
```
:::

## 属性(Attributes)

<div class="listTb">

| 属性   | 描述                   | 类型    | 默认                                   |          |
| ------ | ---------------------- | ------- | -------------------------------------- | -------- |
| text   | 组件的内容             | string  | Number                                 | ''       |
| max    | 如果是 number 的最大值 | string  | number                                 | '10099'  |
| dot    | 是否为点状             | boolean | false                                  |          |
| status | 状态                   | string  | 'primary','success','warning','danger' | 'danger' |

</div>

## 插槽(Slot)

<div class="listTb">

| 名称    | 描述         |
| ------- | ------------ |
| default | 内容 |
| icon | 徽章内容默认text |


</div>



## 变量(cssVariables)

<div class="cssVar">

| 变量名                 | 变量值 | 描述               |
| ---------------------- | ------ | ------------------ |
| --border-radius-20         | 20px    | 默认圆角           |
| --padding-4      | 4px    | 内边距             |
| --font-body-1 | 12px    | 默认文字大小 |
| --`state`-6 | --    | 徽标颜色 |


</div>