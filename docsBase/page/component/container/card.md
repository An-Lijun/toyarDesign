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

## 加载模式

:::demo 基础用法

```html
<TyCard :isLoading="true"> main </TyCard>
```
:::


## 属性(Attributes)

<div class="listTb">

| 属性   | 描述         | 类型    | 值                | 默认 |
| ------ | ------------ | ------- | ----------------- | ---- |
| shadow | 阴影模式     | String  | always/hover/none | none |
| border | 是否显示边框 | Boolean | --                | true |
| isLoading | 是否显示骨架屏 | Boolean | --                | false |


</div>
## 插槽(slot)

<div class="listTb">

| 名称    | 描述         |
| ------- | ------------ |
| default | 默认插槽     |
| header  | 头部插槽可选 |

</div>


## 变量(cssVariables)

<div class="cssVar">

| 变量名                 | 变量值 | 描述               |
| ---------------------- | ------ | ------------------ |
| --color-bg-2         | --     | 背景色             |
| --border-radius-4      | 4px    | 圆角               |
| --border-color-2 | 2px   | 边框 |
| --padding-2 | 2px   | 内容padding |
| --padding-2 | 2px   | 内容padding |
| --box-shadow-5 | --   | 悬浮阴影 |

</div>
