<template>
  <div>
    <router-link to="button">button</router-link>
    <router-view></router-view>
    {{ ref1 }}
    <TySwitch v-model="ref1">1</TySwitch>
  </div>


</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TyMessage, TyAlert, TyNotification,TyLoading } from './package/index'

let ref1 =ref([])
</script>
<style>

</style>
