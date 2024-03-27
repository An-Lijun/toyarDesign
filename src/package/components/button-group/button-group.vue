<template>
  <div class="ty-button-group">
      <slot></slot>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>
  .ty-button-group{
    &>::v-deep .ty-button{
      border-radius:  var(--border-radius-0);
      border-radius: var(--border-radius-0);
    }
    &>::v-deep .ty-button:first-child{
      border-radius: var(--border-radius-3);
    }
    &>::v-deep .ty-button:last-child
    {
    }
  }
</style>
