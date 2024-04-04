<template>
  <div class="divRoot">
  <TyRadio v-model="isC" :value="0" size="mini">123</TyRadio>
  <TyRadio v-model="isC" :value="1" size="small">456</TyRadio>
  <hr>
  <TyRadio v-model="isC" :value="2" size="mini">123</TyRadio>
  <TyRadio v-model="isC" :value="3" size="small">456</TyRadio>
  <TyRadio v-model="isC" :value="4" size="medium">456</TyRadio>
  <TyRadio v-model="isC" :value="5" size="large">456</TyRadio>
  </div>
</template>
<script setup>
  import {ref} from 'vue'
 const isC =ref('')
</script>
<style lang="less" scoped>
</style>

