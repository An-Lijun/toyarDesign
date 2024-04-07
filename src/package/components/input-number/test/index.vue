<template>
  <div class="divRoot">
    <TyInputNumber v-model="inp" />

    <hr>
    <TyInputNumber v-model="inp" :clearable="false"/>

    <hr>
    <TyInputNumber v-model="inp"  size="mini" />

    <hr>
    <TyInputNumber v-model="inp"  size="small" />
    <hr>
    <TyInputNumber v-model="inp"  size="medium" />
    <hr>
    <TyInputNumber v-model="inp"  size="large" />
    <hr>
    <TyInputNumber v-model="inp" disabled  size="large" />
    <hr>
    <TyInputNumber v-model="inp" readonly  size="large" />
    <hr>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const inp = ref('')
</script>
<style lang="less" scoped>
</style>
