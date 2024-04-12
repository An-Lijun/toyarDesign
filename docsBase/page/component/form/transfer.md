# transfer

## 基本用法

:::demo

```html
{{arr100}}
<hr />
<TyTransfer :data="transferData" v-model="arr100" />
```

```JavaScript
const transferData =ref([{
  label:'haha',
  value:1
},
  {
  label:'haha1',
  value:2
}
])
const arr100= ref([])
```
:::

<script setup>
  import {ref } from 'vue'
const transferData =ref([{
  label:'haha',
  value:1
},
  {
  label:'haha1',
  value:2
}
])
const arr100= ref([])
</script>

## 属性(Attributes)

<div class="listTb">

| 属性       | 描述                     | 类型  | 值     | 默认 |
| ---------- | ------------------------ | ----- | ------ | ---- |
| data       | 穿梭框源数据             | Array | --     | mini |
| modelValue | v-model 绑定值(required) | Array | number | ''   |

</div>
