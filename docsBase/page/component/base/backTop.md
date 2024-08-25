# BackTop 滚动到顶部

## 基础用法

:::demo

```html
<div style=" position: relative;">
  <div
    style="max-height:300px;height: 300px; overflow:scroll"
    class="scrollBox"
  >
    <template v-for="(item,index) in arr">
      <br />
      <div v-text="index"></div>
    </template>
    <TyBackTop target=".scrollBox" />
  </div>
</div>
```
:::


## 修改位置

:::demo

```html
<div style=" position: relative;">
  <div
    style="max-height:300px;height: 300px; overflow:scroll"
    class="scrollBox1"
  >
    <template v-for="(item,index) in arr">
      <br />
      <div v-text="index"></div>
    </template>
    <TyBackTop target=".scrollBox1" vHeight="150" right="80" bottom="80" />
  </div>
</div>
```
:::


## 修改形状

:::demo

```html
<div style=" position: relative;">
  <div
    style="max-height:300px;height: 300px; overflow:scroll"
    class="scrollBox2"
  >
    <template v-for="(item,index) in arr">
      <br />
      <div v-text="index"></div>
    </template>
    <TyBackTop target=".scrollBox2" circle vHeight="150" right="80" bottom="80" />
  </div>
</div>
```
:::


## 修改内容

:::demo

```html
<div style=" position: relative;">
  <div
    style="max-height:300px;height: 300px; overflow:scroll"
    class="scrollBox3"
  >
    <template v-for="(item,index) in arr">
      <br />
      <div v-text="index"></div>
    </template>
    <TyBackTop target=".scrollBox3"  vHeight="150" right="80" bottom="80" >
      Up
      </TyBackTop>
  </div>
</div>
```
:::

<script setup>
  let arr =  new Array(300)
</script>



## 属性(Attributes)

<div class="listTb">

| 属性    | 描述                      | 类型    | 值  | 默认  |
| ------- | ------------------------- | ------- | --- | ----- |
| vHeight | 滚动多少距离后展示 (px)   | number  |     | 200   |
| right   | 距离页面右侧距离 (px)     | number  |     | 40    |
| bottom  | 距离页面底部距离 (px)     | number  |     | 40    |
| target  | 绑定滚动的 dom 元素选择器 | string  |     | ''    |
| circle  | 是否为圆形                | Boolean |     | false |

</div>



## 插槽(slot)

<div class="listTb">

| 名称    | 描述     |
| ------- | -------- |
| default | 默认插槽 |

</div>