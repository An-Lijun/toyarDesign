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
<style lang="scss" scoped>

.ty-skeleton {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 10px 0;
  overflow: hidden;

}
.is-more{
  .ty-skeleton-item{
    &:last-child{
      width: 50%;
    }
  }
}
</style>
