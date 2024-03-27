<template>
  <h6>
    <TySwitch v-model="theme"
     :openValue="true" :closeValue="false" 
     uncheckedText="亮" checkedText="暗"></TySwitch>
  </h6>
  <div>
  <span v-for="item in routes" style="margin:0 10px">
    <router-link :to="item.name">{{item.name}}</router-link>
  </span>
  <br>
  <hr>
    <router-view></router-view>

  </div>


</template>
<script setup lang="ts">
import {routes} from './router'


import { ref, watch} from 'vue'
import { TyMessage, TyAlert, TyNotification,TyLoading } from './package/index'

let theme =ref(false)

watch(
 theme,
  (newVal, oldVal) => {
    console.log(newVal,theme);
    document.getElementsByTagName('html')[0].setAttribute('toyar-theme', newVal?'dark':'light')
  }
)
</script>
<style>

</style>
