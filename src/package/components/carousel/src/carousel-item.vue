<template>
  <div :class="nm.bem('item')">
    <slot></slot>
  </div>
</template>
<script setup lang='ts' name="TyCarouselItem">
import {inject,onMounted} from 'vue'
import {carouselContent} from '../../../hooks/symbolNm'
import { nm } from './context';
import type {ProvideCarousel} from './carousel.vue'
defineOptions({
  name:'TyCarouselItem'
})
const {setItem} =inject(carouselContent,{}) as ProvideCarousel
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
