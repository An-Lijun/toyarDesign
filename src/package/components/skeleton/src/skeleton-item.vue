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
console.log(style.value);

</script>
<style lang="scss" scoped>
@keyframes skeletonLoading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
.ty-skeleton-item {
  height: 25px;
  border-radius: 4px;
  margin: 0 10px;
  margin-bottom: 15px;
  background: linear-gradient(
    90deg,
    var(--fill-2) 25%,
    var(--fill-3) 37%,
    var(--fill-2) 63%
  );
  background-size: 400% 100%;
  background-repeat: no-repeat;
  animation: skeletonLoading 1s cubic-bezier(0, 0, 1, 1) infinite;
  &.is-circle {
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
}
</style>
