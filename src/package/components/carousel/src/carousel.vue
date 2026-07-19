<template>
  <div :class="nm.b()" ref="carousel" @mouseenter.prevent="carouselEnter" @mouseleave.prevent="carouselLeave">
    <ul :style="{
      transform: `translate${direction === 'horizontal' ? 'X' : 'Y'}(${translateValue}px)`,
      transition: `transform 0.5s ${easing}`,
      flexDirection: direction === 'horizontal' ? 'row' : 'column',
    }">
      <slot> </slot>
    </ul>

    <div :class="nm.e('leftIndicator')" @click="toLeft" v-if="isShowArrow"></div>
    <div :class="nm.e('rightIndicator')" @click="toRight" v-if="isShowArrow"></div>
    <div :class="[nm.e('indicators'), nm.m(indicatorPosition)]">
      <slot name="indicator">
        <li v-for="(, index) in list" :key="index" :class="[
          index === now ? 'active' : '',
          indicatorType
        ]" @click="selectIndicator(index)"></li>
      </slot>
    </div>
  </div>
</template>
<script setup lang='ts' name="TyCarousel">
import { onMounted, ref, provide, watch, computed } from 'vue'
import { carouselContent } from '../../../hooks/symbolNm'
import { carProps, nm } from './context'
import type { Ref } from 'vue'
defineOptions({
  name: 'TyCarousel'
})
const props = defineProps(carProps)

const carousel = ref()
let baseWidth = 0
let baseHeight = 0

let translateValue = ref(0)
let list: Ref<Array<string>> = ref([])
let now = ref(0)
let timmer: null | NodeJS.Timeout = null
let isHower = ref(false)
const start = () => {
  return setInterval(() => {
    now.value++
    if (now.value >= list.value.length) {
      now.value = 0
    }
  }, props.interval)
}
const carouselEnter = () => {
  isHower.value = true
  if (!props.isAutoPlay) return
  clearInterval((timmer as NodeJS.Timeout))
}
const carouselLeave = () => {
  isHower.value = false
  if (!props.isAutoPlay) return
  timmer = start()
}

const toLeft = () => now.value = now.value === 0 ? list.value.length - 1 : now.value - 1
const toRight = () => now.value = now.value === list.value.length - 1 ? 0 : now.value + 1

const selectIndicator = (index) => {
  now.value = index
}

const isShowArrow = computed(() => {
  switch (props.arrowMode) {
    case 'always':
      return true
    case 'hover':
      return isHower.value
    default:
      return false
  }
})
watch(now, () => {
  translateValue.value = -(now.value * (props.direction === 'horizontal' ? baseWidth : baseHeight))
})

onMounted(() => {
  const { width, height } = carousel.value.getBoundingClientRect()
  baseWidth = width
  baseHeight = height
  console.log(baseHeight);

  if (!props.isAutoPlay) return
  timmer = start()
})
const setItem = () => {
  list.value.push(String(list.value.length))
}

const provideCarousel = {
  setItem
}
export type ProvideCarousel = typeof provideCarousel
provide(carouselContent, provideCarousel)
</script>
