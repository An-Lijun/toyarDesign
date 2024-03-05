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
<TyBadge text="HOT" max="15" type="dot" style="margin-right:30px">
  <TyButton>提交</TyButton>
</TyBadge>
```

:::

## 多种色彩

:::demo

```html
<div style="margin-top:20px">
  <TyBadge text="HOT" max="15" type="dot" style="margin-right:30px">
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
    type="dot"
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
    type="dot"
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
    type="dot"
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

## 属性(Attributes)

<div class="listTb">

| 属性   | 描述                   | 类型         | 默认                                   |          |
| ------ | ---------------------- | ------------ | -------------------------------------- | -------- |
| text   | 组件的内容             | string       | Number                                 | ''       |
| max    | 如果是 number 的最大值 | string       | number                                 | '10099'  |
| type   | 是否为点状             | 'text'/'dot' | 'text'                                 |          |
| status | 状态                   | string       | 'primary','success','warning','danger' | 'danger' |

</div>

## 插槽(Slot)
<div class="listTb">
| 名称    | 描述         |
| ------- | ------------ |
| default | radio 的描述 |

</div>