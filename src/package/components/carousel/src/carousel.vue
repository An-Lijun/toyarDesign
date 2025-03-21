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
      background: rgba(0, 0, 0, 0.5);
      cursor: pointer;
    }
  }

  &__indicators {
    position: absolute;
    display: flex;

    li.dot {
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

      &:hover {
        cursor: pointer;
      }
    }

    li.slider {
      list-style: none;
      padding: unset;
      margin: unset;
      width: 10px;
      height: 10px;
      margin: 0 5px;
      background-color: rgba(255, 255, 255, 0.3);

      &.active {
        background-color: rgba(255, 255, 255, 0.9);
      }

      &:hover {
        cursor: pointer;
      }
    }

    li.line {
      list-style: none;
      padding: unset;
      margin: unset;
      width: 15px;
      height: 4px;
      background-color: rgba(255, 255, 255, 0.3);

      &.active {
        background-color: rgba(255, 255, 255, 0.9);
      }

      &:hover {
        cursor: pointer;
      }
    }

    &.ty-carousel--bottom {
      bottom: 10px;
    }

    &.ty-carousel--top {
      top: 10px;
    }

    &.ty-carousel--left {
      left: 10px;
      flex-direction: column;

      .dot {
        margin-bottom: 10px;
      }

      .line {
        width: 4px;
        height: 15px;
      }

      .slider {
        margin-bottom: 10px;
      }
    }

    &.ty-carousel--right {
      right: 10px;
      flex-direction: column;

      .dot {
        margin-bottom: 10px;
      }

      .line {
        width: 4px;
        height: 15px;
      }

      .slider {
        margin-bottom: 10px;
      }
    }
  }


}
</style>
