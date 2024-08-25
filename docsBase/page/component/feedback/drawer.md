# 抽屉

## 基本用法

:::demo

```html
<TyButton @click="fn">点我</TyButton>
<TyDrawer v-model="model">
  <template #header> 123 </template>
    内容
  <template #footer>
    <TyButton style="margin-right: 20px;"> 确认 </TyButton>
    <TyButton type="secondary"> 取消 </TyButton>
  </template>
</TyDrawer>
```

```js
let model = ref(false)
const fn = () => {
  model.value = !model.value
}
```

:::

## 插槽(Slots)

<!-- | 属性   | 描述                       | 类型   | 值  | 默认                       |
| ------ | -------------------------- | ------ | --- | -------------------------- |
| type   | message 的类型             | string | --  | info/success/error/warning |
| 类方法 | warning/info/error/success | string | --  | --                         | -->

## 属性(Attributes)

<!-- | 属性   | 描述                       | 类型   | 值  | 默认                       |
| ------ | -------------------------- | ------ | --- | -------------------------- |
| type   | message 的类型             | string | --  | info/success/error/warning |
| 类方法 | warning/info/error/success | string | --  | --                         | -->

<script setup>
  import {ref} from 'vue'
let model = ref(false)
const fn = () => {
  model.value = !model.value
}

</script>
