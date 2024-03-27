<template>
  <div class="divRoot">
    <TyCheckBox v-model="r1">11</TyCheckBox>
    <hr>
    <div v-for='item in ["mini", "small",  "medium","large"]'>
      <TyCheckBox v-model="r1" :size="item">22</TyCheckBox>
    </div>
    <hr>
    <TyCheckBox disabled v-model="r1" :size="item">22</TyCheckBox>
    <TyCheckBox canHarf v-model="r1" :size="item">22</TyCheckBox>

  </div>
</template>
<script setup>
import { ref } from 'vue';

let r1 = ref(false)
</script>
<style lang="less" scoped>
</style>
