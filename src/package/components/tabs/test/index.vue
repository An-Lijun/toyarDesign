<template>
  <div class="divRoot">
    <TyTabs v-model="tya" trigger="hover">
  <TyTabItem title="a" name="a"></TyTabItem>
  <TyTabItem title="b" name="b"></TyTabItem>
  <TyTabItem title="c" name="c"></TyTabItem>
  <TyTabItem title="d" name="d"></TyTabItem>
</TyTabs>
<TyTabs v-model="tya" type="card" position="left">
  <TyTabItem title="a" name="a"></TyTabItem>
    <TyTabItem title="b" name="b"></TyTabItem>
    <TyTabItem title="c" name="c"></TyTabItem>
    <TyTabItem title="d" name="d"></TyTabItem>
  </TyTabs>
  <TyTabs v-model="tya" position="right">
    <TyTabItem title="a" name="a"></TyTabItem>
    <TyTabItem title="b" name="b"></TyTabItem>
    <TyTabItem title="c" name="c"></TyTabItem>
    <TyTabItem title="d" name="d"></TyTabItem>
  </TyTabs>
  </div>
</template>
<script setup>
const tya =ref('b')
</script>
<style lang="less" scoped>
</style>
