<template>
  <div class="divRoot">
    <template  v-for="state in states">
      <TyButton :state="state" v-for="item in type" :type="item">111</TyButton>
       <hr/>
    </template>
    <template  v-for="state in states">
      <TyButton disabled :state="state" v-for="item in type" :type="item">111</TyButton>
       <hr/>
    </template>
    <template  v-for="size in sizes">
      <TyButton :size="size" v-for="item in type" :type="item">111</TyButton>
      <hr>
    </template>
  </div>
</template>
<script setup>
import { TY_SIZE,TY_STATE } from '@/package/constant';
  let states=ref(TY_STATE)
  let sizes= ref(TY_SIZE )
  let type=ref(['normal','secondary','dashed','text','link'])
</script>
<style lang="scss" scoped>

</style>
