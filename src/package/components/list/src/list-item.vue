<template>
  <div :class="[listNm.b(item),listNm.bem(item,'',size)]">
    <slot></slot>
  </div>
</template>
<script setup>
import { inject } from 'vue'
import {listNm } from './context'

defineOptions({
  name:'TyListItem'
})
const { size } = inject('listValue')
</script>
<style lang="scss" scoped>
$btnSize: (
  mini: (
    1
  ),
  small: (
    3
  ),
  medium: (
    3
  ),
  large: (
    4
  )
);
@mixin addSize($name, $value) {
  .ty-list-item--#{$name} {
    height: var(--size-#{$name});
    line-height: var(--size-#{$name});
    padding: 0 var(--padding-#{$value});
  }
}
@each $name, $value in $btnSize {
  @include addSize($name, $value);
}
.ty-list-item {
  border-bottom: 1px solid var(--border-color-2);
  &:last-child {
    border: unset;
  }
}
</style>
