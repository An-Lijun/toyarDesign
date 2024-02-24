<template>
  <footer class="ty-footer"
    :style="{
      height: `${height}px`
    }"
  > 
    <slot></slot>
  </footer>
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
  .ty-footer{
    width: 100%;
  }
</style>
