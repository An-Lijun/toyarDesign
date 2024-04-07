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
  & > ::v-deep .ty-button {
    border-radius: var(--border-radius-0);
    border-radius: var(--border-radius-0);
    margin-right: 1px;
  }
  & > ::v-deep .ty-button:first-child {
    border-radius: var(--border-radius-4) 0 0 var(--border-radius-4);
  }
  & > ::v-deep .ty-button:last-child {
    border-radius: 0 var(--border-radius-4) var(--border-radius-4) 0;
    margin: unset;
  }
}
</style>
