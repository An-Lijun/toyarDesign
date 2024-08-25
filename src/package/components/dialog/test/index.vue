<template>
  <div class="divRoot">
    <TyButton @click="isShow1=!isShow1">123</TyButton>
    
    <TyDialog v-model="isShow1">
      12345679
    </TyDialog>
    <hr>
    <TyButton @click="isShow2=!isShow2">123</TyButton>
    
    <TyDialog v-model="isShow2">
      <TyTable :columns="columns" :data="tableData"> 
          <template #operation="scroped">
            <TyButton @click="fnner(scroped.row)">{{ scroped.row.name }}</TyButton>
          </template>
      </TyTable>
    </TyDialog>
    <TyButton @click="openDialog">js函数打开</TyButton>

    <TyButton @click="openDialogRender">js函数+render打开</TyButton>

  </div>
</template>
<script setup>
import { TyButton,TyAlert } from '@/package';
import { ref ,h} from 'vue';

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
const openDialog=()=>{
 const {distroy} =TyAlert('123456789',{
    title:'标题11',
    type:'error',
    sure:{
      text:'确定',
      code:()=>{
        console.log('点击了确定')
        distroy()
      }
    },
    cancel:{
      text:'取消',
      code:()=>{
        console.log('点击了取消')
      }
    }
  })
}

const openDialogRender =()=>{
  TyAlert('123456789',{
    title: h(
        TyButton,
        {
          state: 'primary',
          onClick: (() => { })
        },
        '确认'
      ),
    type:'error',
    sure:{
      text:'确定',
      code:()=>{
        console.log('点击了确定')
      }
    },
    cancel:{
      text:'取消',
      code:()=>{
        console.log('点击了取消')
      }
    }
  })
}
</script>
<style lang="less" scoped>
</style>
