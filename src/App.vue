<template>
  <h6>
    <TySwitch v-model="theme"
     :openValue="true" :closeValue="false" 
     uncheckedText="亮" checkedText="暗"></TySwitch>
  </h6>
  <div>
  <span v-for="item in routes" style="margin:0 5px">
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
import { TyMessage, TyAlert, TyNotification,TyLoading ,TyThemeChange} from './package/index'
let theme =ref(false)

watch(
 theme,
  (newVal, oldVal) => {
    TyThemeChange()
  }
)
</script>
<style >
html{
  background-color: var(--color-bg-1);
}
a{
  padding: 0 5px;

}
.router-link-exact-active{
  background-color: blue;
  color: #fff;
}
</style>
