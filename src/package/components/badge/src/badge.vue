<template>
  <div :class="[nm.b(), nm.m(props.status), nm.is('dot', dot)]">
    <slot></slot>
    <span :class="nm.e('text')">
      {{ text }}
    </span>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import useNmSpace from '../../../hooks/useBem'
import { badgeProp } from './context'

defineOptions({
  name: 'TyBadge'
})
const props = defineProps(badgeProp)
const nm = useNmSpace('badge')

const text = computed(() => {
  if (props.dot) {
    return ''
  }
  if (!isNaN(props.text)) {
    // '⁺'
    return props.text > props.max ? props.max + '+' : props.text
  }
  return props.text
})
</script>
<style lang="scss" scoped>
.ty-badge {
  position: relative;
  display: inline-block;

   &__text {
    position: absolute;
    top: 2px;
    right: 2px;
    transform: translate(50%, -50%);
    border-radius: 20px;
    padding: 0 6px;
    min-width: 20px;
    font-size: 12px;
    box-shadow: 0 0 0 2px #fff;
    color: #fff;
    height: 20px;
    line-height: 20px;
    text-align: center;
    user-select: none;
    overflow: hidden;
  }

  &.is-dot {
    .ty-badge__text {
      top: 2px;
      right: 2px;
      width: 10px;
      min-width: 10px;
      height: 10px;
      border-radius: 50%;
      line-height: 4px;
      padding: unset;
    }
  }
  @mixin addState($state) {
    //基础按钮
    &--#{$state} > .ty-badge__text {
      background-color: var(--#{$state}-6);
    }
  }

  @each $state in 'primary', 'success', 'warning', 'danger' {
    @include addState($state);
  }
}
</style>
