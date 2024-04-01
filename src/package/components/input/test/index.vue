<template>
  <div class="divRoot">
    <TyInput v-model="inp" />

    <hr>
    <TyInput v-model="inp" :clearable="false"/>

    <hr>
    <TyInput v-model="inp"  size="mini" />

    <hr>
    <TyInput v-model="inp"  size="small" />
    <hr>
    <TyInput v-model="inp"  size="medium" />
    <hr>
    <TyInput v-model="inp"  size="large" />
    <hr>
    <TyInput v-model="inp"  outPreText="http" size="large" />
    <hr />
    <TyInput v-model="inp" >
  <template #outPre>
    <ty-button>btn</ty-button>
  </template>
</TyInput>
<hr />
<TyInput v-model="inp"  disabled>
  <template #outPre>
    <ty-button>btn</ty-button>
  </template>
</TyInput>
<hr />
<TyInput v-model="inp"  outAftText=".com" size="large" />

<hr />
<TyInput v-model="inp" >
  <template #outAft>
    <ty-button>
      <ty-icon color="#FFF" icon="ty-search-line" />
    </ty-button>
  </template>
</TyInput>
<hr />
<TyInput v-model="inp" size="medium" >
  <template #outAft>
    <ty-button  style="height: 100%;">
      <ty-icon color="#FFF" icon="ty-search-line" />
    </ty-button>
  </template>
</TyInput>
<hr />
<TyInput v-model="inp"  size="large" >
  <template #outAft>
    <ty-button style="height: 100%;">
      <ty-icon color="#FFF" icon="ty-search-line" />
    </ty-button>
  </template>
</TyInput>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const inp = ref('')
</script>
<style lang="less" scoped>
</style>
