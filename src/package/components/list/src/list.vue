<template>
  <div class="ty-list">
    <header :class="`ty-list-header-${size}`">
      <slot name="header">
        {{ props.header }}
      </slot>
    </header>
    <div class="list-content">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  header: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'small',
    validator: value => {
      return ['mini', 'small', 'medium', 'large'].includes(value)
    }
  }
})
provide('listValue', {
  size: props.size
})
</script>
<style lang="scss" scoped>
.ty-list {
  border: 1px solid var(--border-color-2);
  box-sizing: border-box;

  .list-content {
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
    .ty-list-header-#{$name} {
      height: var(--size-#{$name});
      line-height: var(--size-#{$name});
      padding: 0 var(--padding-#{$value});
    }
  }
  @each $name, $value in $btnSize {
    @include addSize($name, $value);
  }
}
</style>
