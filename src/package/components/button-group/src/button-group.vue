<template>
  <div :class="nm.b()">
    <slot></slot>
  </div>
</template>
<script setup>
import {nm} from './context'
defineOptions({
  name:'TyButtonGroup'
})
</script>
<style lang="scss" scoped>
.ty-button-group {
  &>:deep(.ty-button) {
    border-radius: var(--border-radius-0);
    border-radius: var(--border-radius-0);
    margin-right: 1px;
  }
  &>:deep(.ty-button):first-child {
    border-radius: var(--border-radius-4) 0 0 var(--border-radius-4);
  }
  &>:deep(.ty-button):last-child {
    border-radius: 0 var(--border-radius-4) var(--border-radius-4) 0;
    margin: unset;
  }
}
</style>
