<template>
  <div class="ty-carousel-item">
    <slot></slot>
  </div>
</template>
<script setup>
import {inject,onMounted} from 'vue'
const {setItem} =inject('carousel',{})
onMounted(() => {
  console.log('----------');
  setItem()
})
</script>
<style lang="scss" scoped>
.ty-carousel-item{
  width: 100%;
  height: 100%;
  flex-shrink: 0;
}
</style>
