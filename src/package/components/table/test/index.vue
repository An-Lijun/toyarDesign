
<template>
  <div class="divRoot">
    <TyTable
    :columns="[
      { title: '姓名', key: 'name' },
      { title: '年龄', key: 'age' },
      { title: '地址', key: 'address' }
    ]"
    :data="[
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
    ]"
  >
    <template #operation="scroped">
      <TyButton @click="fnner(scroped.row)">{{ scroped.row.name }}</TyButton>
    </template>
  </TyTable>
  </div>
</template>
<script setup>
const fnner = row => {
  console.log(row)
}
</script>
<style lang="less" scoped>
</style>
