<template>
  <div :class="nm.bem('item')">
    <slot></slot>
  </div>
</template>
<script setup>
import {inject,onMounted} from 'vue'
import {carouselContent} from '../../../hooks/symbolNm'
import useNmSpace from '@/package/hooks/useBem';
defineOptions({
  name: 'TyCarouselItem'
})
const nm =useNmSpace('carousel')
const {setItem} =inject(carouselContent,{})
onMounted(() => {
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
