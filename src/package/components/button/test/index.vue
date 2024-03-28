<template>
  <div class="divRoot">
    <template  v-for="state in states">
      <TyButton :state="state" v-for="item in type" :type="item">111</TyButton>
      <br>
    </template>
    <hr/>

    <template  v-for="state in states">
      <TyButton disabled :state="state" v-for="item in type" :type="item">111</TyButton>
      <br>
    </template>
    <hr/>

    <template  v-for="size in sizes">
      <TyButton :size="size" v-for="item in type" :type="item">111</TyButton>
      <br>
    </template>
    <hr>
    <template  v-for="shape in shapes">
      <TyButton :shape="shape" v-for="item in type" :type="item">1</TyButton>
      <br>
    </template>
    <hr>
      <TyButton block>1</TyButton>
      <br>
  </div>
</template>
<script setup>
import { TY_SIZE,TY_STATE } from '../../../constant';
  let states=ref(TY_STATE)
  let sizes= ref(TY_SIZE )
  let type=ref(['normal','secondary','dashed','text','link'])
  let shapes=ref(["square", "round", "circle"])

</script>
<style lang="scss" scoped>

</style>
