<template>
  <div class="divRoot">
    <TyButton @click="change1">切换</TyButton>
    <div style="color:#fff; height: 300px">
    </div>
    <hr>

    <TyButton @click="change2">切换</TyButton>
<div class="sg-container" style="color:#fff; height: 300px" v-loading="loading"></div>
<hr>

  </div>
</template>
<script setup>
import {LoadingJs as TyLoading} from '../index'
const change1=()=>{
  const close = TyLoading()
  setTimeout(()=>{
    close()
  },1500)
}
let loading =ref(false)
const change2=()=>{
  loading.value = true
  setTimeout(()=>{
  loading.value = false

  },1500)
}
</script>
<style lang="less" scoped>
</style>
