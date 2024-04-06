<template>
  <div class="divRoot">
  <button @click="()=>reate1=2">2</button>

    <TyRate v-model="reate1"></TyRate>

  </div>
</template>
<script setup>
const reate1 =ref(5)

</script>
<style lang="less" scoped>
</style>
