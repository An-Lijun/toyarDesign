

<template>
  <header>
    <button @click="change">切换</button>
  </header>
  <TyRow :gutter="num">
    <TyCol/>
  </TyRow>

  <div>
    <ty-button @click="fn"   :disabled="boolean">btn</ty-button>
  </div>

</template>
<script setup lang="ts">
import { TyRow } from './package';
import {ref} from 'vue';
  let boolean =ref(true)
  let num =ref(10)
  const change=()=>{
    boolean.value=!boolean.value
    let html = document.getElementsByTagName('html');
      html[0].setAttribute('toyar-theme', boolean?'light':'dark')
  }
  const fn=()=>{
    console.log(123);
    num.value++
  }
</script>
<style scoped>

</style>
