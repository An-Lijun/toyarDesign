<template>
  <div class="divRoot">
    {{ isSwitch }}
  <TySwitch v-model="isSwitch" size="mini"/>
  <hr>
  {{ isSwitch1 }}
  <TySwitch v-model="isSwitch1" openValue="1" closeValue="2" size="small"/>

  <TySwitch v-model="isSwitch" type="tube" size="medium"/>TyLoading
  <hr>

  <TySwitch  v-model="isSwitch1" openValue="1" closeValue="2" type="inline" size="large"/>

  </div>
</template>
<script setup>
const isSwitch1 =ref('1')
const isSwitch =ref(false)
</script>
<style lang="less" scoped>
</style>
