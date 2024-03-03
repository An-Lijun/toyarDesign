<template>
  <div class="" :class="['ty-card',style]">
    <header class="ty-card-header" v-if="useSlots().header">
      <slot name="header"></slot>
    </header>
    <main class="ty-card-main">
      <slot></slot>
    </main>
  </div>
</template>
<script setup>
import { useSlots, computed } from 'vue'
const props = defineProps({
  border: {
    type: Boolean,
    default: true
  },
  shadow: {
    type: String,
    default: 'none'
  }
})
const style = computed(() => {
  let str = ''
  if (props.border) {
    str += 'border '
  }
  switch (props.shadow) {
    case 'always':
      str += 'shadow'
      break
    case 'hover':
      str += 'shadow-hover '
      break
  }
  return str
})
</script>
<style lang="scss" scoped>
.ty-card {
  border-radius: var(--border-radius-4);
  background-color: var(--color-bg-2);
  color: var(--text-1);
  transition: box-shadow .5s;
  &.border {
    border: var(--border-1) solid var(--border-color-2);
  }
  &.shadow {
    box-shadow: var(--box-shadow-5);
  }
  &.shadow-hover {
    &:hover {
      box-shadow: var(--box-shadow-5);
    }
  }
  .ty-card-header {
    border-bottom: var(--border-1) solid var(--border-color-2);
    padding: var(--padding-2);
  }
  .ty-card-main {
    padding: var(--padding-2);
  }
}
</style>
