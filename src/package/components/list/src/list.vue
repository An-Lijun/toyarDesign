<template>
  <div :class="[listNm.b(), listNm.m(size)]">
    <header :class="listNm.e('header')">
      <slot name="header">
        {{ props.header }}
      </slot>
    </header>
    <div :class="listNm.e('content')">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
import { listProps, listNm } from './context'

defineOptions({
  name:'TyList'
})

const props = defineProps(listProps)

provide('listValue', {
  size: props.size
})
</script>
<style lang="scss" scoped>
.ty-list {
  border: 1px solid var(--border-color-2);
  box-sizing: border-box;

  .list__content {
    box-sizing: border-box;
    border-top: 1px solid var(--border-color-2);
  }
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
    &--#{$name} {
      .ty-list__header {
        height: var(--size-#{$name});
        line-height: var(--size-#{$name});
        padding: 0 var(--padding-#{$value});
      }
    }
  }
  @each $name, $value in $btnSize {
    @include addSize($name, $value);
  }
}
</style>
