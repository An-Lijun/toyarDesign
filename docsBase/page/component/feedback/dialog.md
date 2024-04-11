# dialog

## 基本用法

:::demo

```html
<TyButton @click="isShow1=!isShow1">123</TyButton>
<TyDialog v-model="isShow1"> 12345679 </TyDialog>
```

```js
let isShow1 = ref(false)
```

:::

## 插槽

:::demo

```html
<TyButton @click="isShow2=!isShow2">123</TyButton>
<TyDialog v-model="isShow2">
  <TyTable :columns="columns" :data="tableData">
    <template #operation="scroped">
      <TyButton @click="fnner(scroped.row)">{{ scroped.row.name }}</TyButton>
    </template>
  </TyTable>
</TyDialog>
```

```js
let isShow2 = ref(false)
const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
]
const tableData = [
  {
    name: '张三',
    age: '18',
    address: '南京'
  },
  {
    name: '李四',
    age: '18',
    address: '上海'
  },
  {
    name: '张二麻子',
    age: '18',
    address: '长春'
  }
]
```

:::

## 属性(Attributes)

<div class="listTb">

| 属性       | 描述                   | 类型    | 值  | 默认   |
| ---------- | ---------------------- | ------- | --- | ------ |
| title      | dialog 标题            | string  | --  | '提示' |
| width      | dialog 宽度            | string  | --  | 30%    |
| top        | dialog 距离顶部距离    | string  | --  | 15vh   |
| modelValue | dialogv-model required | boolean | --  | false  |
| info       | dialog 内容            | string  | --  | --     |
| isUnderLine       | 是否显示header下划线           | boolean  | --  | true   |


</div>

## 插槽(slot)

<div class="listTb">

| 名称    | 描述     |
| ------- | -------- |
| default | dialog内容 |
| title | dialog标题 |
| footer | dialog底部 |



</div>

<script setup>
  import {ref} from 'vue'
let isShow1 =ref(false)
let isShow2 =ref(false)
const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '地址', key: 'address' }
]
const tableData = [
  {
    name: '张三',
    age: '18',
    address: '南京'
  },
  {
    name: '李四',
    age: '18',
    address: '上海'
  },
  {
    name: '张二麻子',
    age: '18',
    address: '长春'
  }
]

</script>
