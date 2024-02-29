# table

## 基础用法

:::demo

```html
<TyTable :columns="columns" :data="tableData"> </TyTable>
```

```js
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

## 带操作
:::demo

```html
<TyTable :columns="columns" :data="tableData"> 
    <template #operation="scroped">
      <TyButton @click="fnner(scroped.row)">{{ scroped.row.name }}</TyButton>
    </template>
</TyTable>

```

```js
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

<script setup>
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


