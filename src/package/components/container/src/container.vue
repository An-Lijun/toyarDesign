<template>
    <section class="ty-container"
    :class="{
      'flex-column':column
    }"
    >
      <slot></slot>
    </section>
</template>
<script setup>
const props = defineProps({
  column: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="scss" scoped>
  .ty-container{
    display: flex;
    flex: 1;
    width: 100%;
    height: 100%;
    &.flex-column{
      flex-direction: column;
    }
  }
</style>
