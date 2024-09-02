<template>
  <div class="ty-sIcon" ref="svgIcon" :style="{
    width:fontSize,
    height:fontSize,
    color,
    fill,
  }">
    
  </div>
</template>
<script setup>
import { ref } from 'vue'
import {parseSvg ,strToSvg} from '../../../utils/svg'
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  fontSize:{
    type: String,
    required: true,
    default:'16px'
  },
  color:{
    type: String,
    default: 'var(--toyar-gray-10)'
  },
  fill:{
    type: String,
    default: 'var(--toyar-gray-10)'
  }
})
defineOptions({
  name:'TySIcon'
})
const svgIcon = ref()
;(icon =>
  import(`../assets/${icon}.svg?raw`)
    .then(obj => {
      let svg =strToSvg(obj.default)
      parseSvg(svg)
      svgIcon.value.append(svg)
    })
    .catch(e => {
      svgIcon.value.innerHTML = 'undefined'
    }))(props.icon)


</script>
<style lang="scss" scoped>
.ty-svgIcon {
}
</style>
