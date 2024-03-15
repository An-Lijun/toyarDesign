<template>
  <div class="ty-skeleton" ref="skeleton">
    <skeletonItem v-for="item in count"/>
  </div>
</template>
<script setup>
  import skeletonItem from './skeleton-item.vue';
  import {onMounted,ref} from 'vue'
  const skeleton =ref()
  const count =ref(1)
  onMounted(()=>{
   const height= skeleton.value.getBoundingClientRect().height;
   count.value= parseInt(height/60,10) +1
  })
</script>
<style lang="scss" scoped>

.ty-skeleton {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 10px 0;
  overflow: hidden;
}
</style>
