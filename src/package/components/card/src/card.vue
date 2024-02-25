<template>
  <div class="ty-card">
    <header class="ty-card-header" v-if="useSlots().header">
      <slot name="header"></slot>
    </header>
    <main class="ty-card-main">
      <slot></slot>
    </main>
  </div>
</template>
<script setup>
import { useSlots } from 'vue'
</script>
<style lang="scss" scoped>
.ty-card {
  border: var(--border-1) solid var(--border-color-2);
  border-radius: var(--border-radius-4);
  background-color: var(--color-bg-2);
  color: var(--text-1);
  box-shadow: var(--box-shadow-1);
  .ty-card-header {
    border-bottom: var(--border-1) solid var(--border-color-2);
    padding: var(--padding-2);
  }
  .ty-card-main {
    padding: var(--padding-2);
  }
}
</style>
