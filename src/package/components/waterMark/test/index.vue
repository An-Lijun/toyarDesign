<template>
  <div class="divRoot">

<TyWaterMark markInfo="TyDesign">
  <TyTable :columns="columns" :data="tableData"> </TyTable>
</TyWaterMark>
<hr>
<TyWaterMark :markInfo="['TyDesign',time]" :options="{width:300,height:300}">
  <TyTable :columns="columns" :data="tableData"> </TyTable>
</TyWaterMark>
<hr>
<TyWaterMark :markInfo="getAssetsFile('./toyar.png')" :options="{width:400,height:100,rotate:0}">
  <TyTable :columns="columns" :data="tableData"> </TyTable>
</TyWaterMark>
<hr>
<TyWaterMark
  markInfo="TyDesign"
  :options="{
  fontColor:'red',
  fontSize:20,
  fontFamily: 'Arial',
  zIndex:80,
  width: 150,
  height: 150,
  rotate:0
}"
>
  <TyTable :columns="columns" :data="tableData"> </TyTable>
</TyWaterMark>



  </div>
</template>
<script setup>
  const day =new Date()
  const time =`${day.getFullYear()}-${day.getMonth()+1}-${day.getDate()}`
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
  },
    {
    name: '张二麻子',
    age: '18',
    address: '长春'
  },
    {
    name: '张二麻子',
    age: '18',
    address: '长春'
  },
    {
    name: '张二麻子',
    age: '18',
    address: '长春'
  },
]

const getAssetsFile = (url) => {
   return new URL(`${url}`, import.meta.url).href
}
</script>
<style lang="less" scoped>
</style>
