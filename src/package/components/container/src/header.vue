<template>
  <header class="ty-header"
    :style="{
      height: `${height}px`
    }"
  > 
    <slot></slot>
  </header>
</template>
<script setup>
const props = defineProps({
  height: {
    type: String,
    default: "100",
  },
});
</script>
<style lang="scss" scoped>
  .ty-header{
    width: 100%;
  }
</style>
