<template>
  <aside class="ty-aside" 
    :style="{
      width:`${width}px`
    }"
  >
    <slot></slot>
  </aside>
</template>
<script setup>
const props = defineProps({
  width: {
    type: String,
    default: "100",
  },
});
</script>
<style lang="scss" scoped>
  .ty-aside{
    height: 100%;
  }
</style>
