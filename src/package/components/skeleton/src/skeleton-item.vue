<template>
  <div :class="[nm.bem('item'), nm.is('circle', circle)]" :style="style"></div>
</template>
<script setup>
import { ref } from 'vue'
import { nm } from './context'
defineOptions({
  name: 'TySkeletonItem'
})
const props = defineProps({
  circle: {
    type: Boolean,
    default: false
  },
  width: {
    type: String
  },
  height: {
    type: String
  }
})
let style = ref({})
if(props.width){
  style.value.width=`${props.width}`
}
if(props.height){
  style.value.height=`${props.height}`
}

</script>

