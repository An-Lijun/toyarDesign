<template>
  <div :class="nm.bem('item')">
  </div>
</template>
<script setup>
import {nm} from './context'
defineOptions({
    name:'TySkeletonItem'
})
</script>
<style lang="scss" scoped>
@keyframes skeletonLoading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
.ty-skeleton-item{
  height: 25px;
  border-radius: 4px;
  margin:  0 10px;
  margin-bottom: 15px;
  background: linear-gradient(
    90deg,
    var(--fill-2) 25%,
    var(--fill-3) 37%,
    var(--fill-2) 63%
  );
  background-size: 400% 100%;
  background-repeat: no-repeat;
  animation: skeletonLoading 1s cubic-bezier(0, 0, 1, 1) infinite;
}
</style>
