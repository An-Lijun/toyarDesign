<template>
  <div class="divRoot">
    <TyButton @click="isShow1=!isShow1">123</TyButton>
    
    <TyDialog v-model:visible="isShow1">
      12345679
    </TyDialog>
    <hr>
    <TyButton @click="isShow2=!isShow2">123</TyButton>
    
    <TyDialog v-model:visible="isShow2">
      <TyTable :columns="columns" :data="tableData"> 
          <template #operation="scroped">
            <TyButton @click="fnner(scroped.row)">{{ scroped.row.name }}</TyButton>
          </template>
      </TyTable>
    </TyDialog>
  </div>
</template>
<script setup>
import { TyButton } from '@/package';
import { ref } from 'vue';

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
<style lang="less" scoped>
</style>
