<template>
  <div>
    <router-link to="button">button</router-link>
    <router-view></router-view>
  </div>


</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TyMessage, TyAlert, TyNotification,TyLoading } from './package/index'
</script>
<style>

</style>
