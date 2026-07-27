<template>
  <div :class="nm.b()" :style="style" ref="sliderBox">
    <div :class="nm.e('boll')" ref="tyboll" :style="bollStyle" @mousedown="slider"></div>
  </div>
</template>
<script setup>
import { nm, useProps, useEmits } from './context'
import useSlider from './use-slider'

defineOptions({
  name: 'TySlider'
})

const props = defineProps(useProps)
const emit = defineEmits(useEmits)

const { style, bollStyle, sliderBox, tyboll, slider } = useSlider(props, emit)
</script>
