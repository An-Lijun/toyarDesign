# card

## 基础用法

:::demo 基础用法

```html
<TyCard>
  <template #header> header </template>
  main
</TyCard>
```

:::

## 简洁模式

:::demo 基础用法

```html
<TyCard> main </TyCard>
```

:::

## 无边框模式

:::demo 基础用法

```html
<TyCard :border="false"> main </TyCard>
```

:::

## 阴影模式

:::demo 基础用法

```html
<TyCard shadow="always"> main </TyCard>
```

:::

## 悬浮阴影模式

:::demo 基础用法

```html
<TyCard shadow="hover"> main </TyCard>
```

:::

## 属性(Attributes)

<div class="listTb">

| 属性   | 描述         | 类型    | 值                | 默认 |
| ------ | ------------ | ------- | ----------------- | ---- |
| shadow | 阴影模式     | String  | always/hover/none | none |
| border | 是否显示边框 | Boolean | --                | true |

</div>
## 插槽(slot)

<div class="listTb">

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认插槽     |
| header  | 头部插槽可选 |

</div>
