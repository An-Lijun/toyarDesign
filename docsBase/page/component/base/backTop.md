# BackTop 滚动到顶部

## 基础用法

:::demo

```html
<div style="max-height:100px; overflow:auto">
  <br v-for="item in arr" />
  <TyBackTop />
</div>
```

:::

<script setup>
  let arr =  new Array(3000)
</script>

## 属性(Attributes)

<div class="listTb">

| 属性    | 描述                    | 类型    | 值  | 默认  |
| ------- | ----------------------- | ------- | --- | ----- |
| vHeight | 滚动多少距离后展示 (px) | number  |     | 200   |
| right   | 距离页面右侧距离 (px)   | number  |     | 40    |
| bottom  | 距离页面底部距离 (px)   | number  |     | 40    |
| circle  | 是否为圆形              | Boolean |     | false |

</div>
