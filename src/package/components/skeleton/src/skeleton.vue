<template>
  <div :class="[nm.b(),nm.is('more',count>1)]" >
    <skeletonItem v-for="item in count"/>
    <slot></slot>
  </div>
</template>
<script setup>
  import skeletonItem from './skeleton-item.vue';
  import {onMounted,ref} from 'vue'
  import {nm} from './context'

  defineOptions({
    name:'TySkeleton'
  })
  const props=defineProps({
  count:{
    type:Number
  }
})
</script>
