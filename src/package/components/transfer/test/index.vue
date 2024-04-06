<template>
  <div class="divRoot">
    <TyTransfer :data="transferData" v-model="arr100"/>

  </div>
</template>
<script setup>
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
<style lang="less" scoped>
</style>
