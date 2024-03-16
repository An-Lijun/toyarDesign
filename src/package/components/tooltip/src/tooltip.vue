<template>
  <div class="ty-tooltip" v-on="eventMaps">
    <div class="tip" :style="style" v-show="isShowTip">
      {{ props.content }}
    </div>
    <slot></slot>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
  content: {
    type: String,
    default: ''
  },
  placement: {
    type: String,
    default: 'top'
  },
  trigger: {
    type: String,
    default: 'hover'
  }
})
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
  display: inline;

  .tip {
    position: absolute;
    display: block;
    z-index: 99;
    background-color: var(--tooltip);
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    color: #fff;
    white-space: nowrap;
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
