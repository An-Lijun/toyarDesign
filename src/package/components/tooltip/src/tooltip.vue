<template>
  <div :class="nm.b()" v-on="eventMaps">
    <div :class="nm.e('tip')" :style="style" >
      {{ props.content }}
    </div>
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import {toolProps,nm} from './context'

defineOptions({
  name:'TyTooltip'
})
const props = defineProps(toolProps)
let eventMaps = ref({})
let isShowTip = ref(false)
const handleClick = () => {
  isShowTip.value = !isShowTip.value
}
const handleEnter = () => {
  isShowTip.value = true
}
const handleLeave = () => {
  isShowTip.value = false
}
switch (props.trigger) {
  case 'click':
    eventMaps.value = {
      click: handleClick
    }
    break
  case 'hover':
    eventMaps.value = {
      mouseenter: handleEnter,
      mouseleave: handleLeave
    }
    break
  default:
    eventMaps.value = {
      click: handleClick
    }
}
// v-show="isShowTip"
// top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
const getPlacement = () => {
  switch (props.placement) {
    case 'top':
      return {
        top: '0',
        left: '50%',
        transform: 'translate(-50%, calc(-100% - 5px))'
      }
  }
}
let style = ref(getPlacement())
</script>
<style lang="scss" scoped>
.ty-tooltip {
  position: relative;
  display: block;
  width: 100%;

  &__tip {
    position: absolute;
    display: inline-block;
    z-index: 99;
    background-color: var(--tooltip);
    border-radius: 5px;
    min-height: 30px;
    line-height: 30px;
    padding: 0 10px;
    // width: 3%;
    white-space:auto;
    min-width: 200%;
    max-width: 250%;
    // width: 150%;
    color: #fff;
    text-align: center;
    
    &:after {
      content: '';
      display: inline-block;
      // width: 10px;
      // height: 10px;
      // background-color: red;
      position: absolute;
      border: 10px solid transparent;
      border-top-color: var(--tooltip);
      bottom: -20px;
      left: 50%;
      transform: translate(-50%, -2px);
    }
  }
}
</style>
