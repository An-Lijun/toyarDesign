<template>
  <div class="divRoot">
    {{ isProgress }}
    <hr />
    <TySlider style="width: 300px; margin-left: 50px" v-model="isProgress" />
    <TyProgress v-model="isProgress" type="circle" />
    <button @click="addProgress">addProgress</button>
    <div style="width: 500px">
      <TyProgress v-model="isProgress" />
      <hr />
      <TyProgress strokeWidth="10" v-model="isProgress" size="small" />
      <hr />

      <TyProgress strokeWidth="20" v-model="isProgress" size="medium" />
      <hr />

      <TyProgress strokeWidth="30" v-model="isProgress" size="large" />
    </div>
  </div>
</template>
<script setup>
let isProgress =ref(5)

const addProgress=()=>{
  isProgress.value = isProgress.value +5
}
</script>
<style lang="less" scoped></style>
