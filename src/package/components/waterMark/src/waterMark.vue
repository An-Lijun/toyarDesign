<template>
  <div class="ty-waterMark">
    <div
      class="ty-waterMark-mark"
      :style="{
        backgroundImage: `${bgUrl}`
      }"
    ></div>
    <slot></slot>
  </div>
</template>
<script setup>
import {ref} from 'vue'
const props = defineProps({
  markInfo: {
    type: String,
    required: true
  },
  options: {
    type: Object
  }
})
const defaultOptions = {
  fontColor: 'rgba(210,210,230,0.7)',
  fontSize: 30,
  fontFamily: 'Arial',
  zIndex: 999,
  width: 200,
  height: 200,
  rotate: (-30 * Math.PI) / 180,
  offsetX: 0,
  offsetY: 0
}
const options = Object.assign(defaultOptions, props.options)
const bgUrl = ref('')
const createMark = () => {
  const canvas = document.createElement('canvas')
  canvas.width = defaultOptions.width
  canvas.height = defaultOptions.height
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = defaultOptions.fontColor
  ctx.font = `${defaultOptions.fontSize}px ${defaultOptions.fontFamily}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.translate(defaultOptions.width/2,defaultOptions.height/2)
  ctx.rotate(defaultOptions.rotate)
  ctx.fillText(props.markInfo, defaultOptions.offsetX, defaultOptions.offsetY)
  const img = canvas.toDataURL('image/png')
  bgUrl.value = `url(${img})`
}
createMark()
</script>
<style lang="scss" scoped>
.ty-waterMark {
  position: relative;
  .ty-waterMark-mark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
