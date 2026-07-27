<template>
  <div :class="nm.b()" ref="maskContainer">
    <div :class="nm.e('mark')" ref="mark"></div>
    <slot></slot>
  </div>
</template>

<script setup>
import { nm, useProps } from './context'
import useWaterMark from './use-waterMark'

defineOptions({
  name: 'TyWaterMark'
})

const props = defineProps(useProps)
const { mark, maskContainer } = useWaterMark(props)
</script>
