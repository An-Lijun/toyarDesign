<template>
  <span :class="nm.e('index')" :style="{width:width+'px'}" v-for="item in compLevel" :key="item">
  </span>
</template>
<script setup>
import { nm } from './context'
const props = defineProps({
  compLevel: {
    type: Number
  },
  width:{
    type: Number,
    default: 10
  }
})
</script>
<style lang="scss" scoped>
.ty-menu__index {
  width: 10px;
  display: inline-block;
  height: 100%;
}
</style>
