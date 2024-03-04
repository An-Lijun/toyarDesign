# tabs

## 基础用法

:::demo 基础用法

```html
<TyTabs v-model="vmod1">
  <TyTabItem title="a" name="a"></TyTabItem>
  <TyTabItem title="b" name="b"></TyTabItem>
  <TyTabItem title="c" name="c"></TyTabItem>
  <TyTabItem title="d" name="d"></TyTabItem>
</TyTabs>
```

```JavaScript
  const vmod1 = ref("")
```

:::

## 更改类型

:::demo 基础用法

```html
<TyTabs v-model="vmod2" type="card">
  <TyTabItem title="a" name="a"></TyTabItem>
  <TyTabItem title="b" name="b"></TyTabItem>
  <TyTabItem title="c" name="c"></TyTabItem>
  <TyTabItem title="d" name="d"></TyTabItem>
</TyTabs>
```

```JavaScript
  const vmod2 = ref("")
```

:::

## 位置(position)

:::demo 基础用法

```html
<TyTabs v-model="vmod3" type="card" position="top">
  <TyTabItem title="a" name="a"></TyTabItem>
  <TyTabItem title="b" name="b"></TyTabItem>
  <TyTabItem title="c" name="c"></TyTabItem>
  <TyTabItem title="d" name="d"></TyTabItem>
</TyTabs>
<hr />
<TyTabs v-model="vmod3" type="card" position="left">
  <TyTabItem title="a" name="a"></TyTabItem>
  <TyTabItem title="b" name="b"></TyTabItem>
  <TyTabItem title="c" name="c"></TyTabItem>
  <TyTabItem title="d" name="d"></TyTabItem>
</TyTabs>
<hr />
<TyTabs v-model="vmod3" type="card" position="right">
  <TyTabItem title="a" name="a"></TyTabItem>
  <TyTabItem title="b" name="b"></TyTabItem>
  <TyTabItem title="c" name="c"></TyTabItem>
  <TyTabItem title="d" name="d"></TyTabItem>
</TyTabs>
```

```JavaScript
  const vmod3 = ref("")
```

:::

## 更改触发方式

:::demo 更改触发方式

```html
<TyTabs v-model="vmod4" type="card" trigger="hover">
  <TyTabItem title="a" name="a"></TyTabItem>
  <TyTabItem title="b" name="b"></TyTabItem>
  <TyTabItem title="c" name="c"></TyTabItem>
  <TyTabItem title="d" name="d"></TyTabItem>
</TyTabs>
```

```JavaScript
  const vmod4 = ref("")
```

:::

## 属性(Attributes)

<div class="listTb">

| 属性       | 描述                                       | 类型   | 值             | 默认   |
| ---------- | ------------------------------------------ | ------ | -------------- | ------ |
| modelValue | v-model 绑定值如果是空则默认选中第一个 tab | String | --             | ''     |
| type       | tabs 类型                                  | String | normal/card    | normal |
| trigger    | tabs 触发时机                              | String | click/hover    | click  |
| position   | tabs 位置                                  | String | top/left/right | top    |

</div>


## 插槽(slot)
<div class="listTb">

| 组件名称 | 名称    | 描述     |
| -------- | ------- | -------- |
| tabs     | default | 默认插槽 |
| tab-item | default | 默认插槽 |

</div>

<script setup>
import {ref} from 'vue'
 const vmod1 = ref("")
  const vmod2 = ref("")
  const vmod3 = ref("")
  const vmod4 = ref("")


</script>
