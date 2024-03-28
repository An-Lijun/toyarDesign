<template>
  <div
    :class="nm.b()"
    ref="carousel"
    @mouseenter.prevent="carouselEnter"
    @mouseleave.prevent="carouselLeave"
  >
    <ul
      :style="{
        transform: `translateX(${width}px)`
      }"
    >
      <slot> </slot>
    </ul>

    <div :class="nm.e('leftIndicator')" @click="toLeft" v-if="showIndicator"></div>
    <div :class="nm.e('rightIndicator')" @click="toRight" v-if="showIndicator"></div>
    <div :class="nm.e('indicators')">
      <slot name="indicator">
        <li
          v-for="(item, index) in list"
          :class="{
            active: index === now
          }"
        ></li>
      </slot>
    </div>
  </div>
</template>
<script setup lang='ts' name="TyCarousel">
import { onMounted, ref, provide, watch } from 'vue'
import {carouselContent} from '../../../hooks/symbolNm'
import {carProps,nm} from './context'

const props = defineProps(carProps)

const carousel = ref()
let baseWidth = 0
let width = ref(0)
let list = ref([])

let now = ref(0)
let timmer = null
const start = () => {
  return setInterval(() => {
    now.value++
    if (now.value >= list.value.length) {
      now.value = 0
    }
  }, props.interval)
}
const carouselEnter = () => clearInterval(timmer)
const carouselLeave = () => timmer = start()
const toLeft = () => now.value === 0?now.value = list.value.length - 1: now.value-1
const toRight = () => now.value = now.value=== list.value.length - 1? 0: now.value+1

watch(now, () => {
  width.value = -(now.value * baseWidth)
})

onMounted(() => {
  baseWidth = carousel.value.getBoundingClientRect().width
  timmer = start()
})
const setItem = () => {
  list.value.push(String(list.value.length))
}
provide(carouselContent, {
  setItem
})
</script>
<style lang="scss" scoped>
.ty-carousel {
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  ul {
    display: flex;
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    margin: unset;
    padding: unset;
    transition: all 0.5s;
  }
  &__leftIndicator {
    width: 30px;
    height: 40px;
    z-index: 2;
    position: absolute;
    box-sizing: border-box;
    left: 10px;
    border-radius: 50% 0 0 50%;
    background-color: rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
    &:hover {
      background: #000;
      cursor: pointer;
    }
  }
  &__rightIndicator {
    width: 30px;
    height: 40px;
    z-index: 2;
    position: absolute;
    box-sizing: border-box;
    right: 10px;
    border-radius: 0 50% 50% 0;
    background-color: rgba(0, 0, 0, 0.2);
    transition: all 0.5s;
    &:hover {
      background: #000;
      cursor: pointer;
    }
  }
  &__indicators {
    position: absolute;
    bottom: 10px;
    display: flex;
    li {
      list-style: none;
      padding: unset;
      margin: unset;
      border-radius: 5px;
      width: 10px;
      height: 10px;
      margin: 0 5px;
      background-color: rgba(255, 255, 255, 0.3);
      &.active {
        background-color: rgba(255, 255, 255, 0.9);
      }
    }
  }
}
</style>
