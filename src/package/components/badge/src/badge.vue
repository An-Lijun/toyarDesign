<template>
  <div :class="[nm.b(), nm.m(props.status), nm.is('dot', dot)]">
    <slot></slot>
    <span :class="nm.e('text')">
      <slot name="icon">
        {{ text }}
      </slot>
    </span>
  </div>
</template>
<script setup lang='ts' name="TyBadge">
import { computed } from 'vue'
import { badgeProp,nm } from './context'

defineOptions({
  name:'TyBadge'
})
const props = defineProps(badgeProp)

const text = computed(() => {
  if (props.dot) {
    return ''
  }
  if (!isNaN(props.text as number)) {
    const text = Number(props.text)
    return text > props.max ? props.max + '+' : text
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
    border-radius: var(--border-radius-20);
    padding:var(--padding-0)  var(--padding-4);
    min-width: 20px;
    font-size: var(--font-body-1);
    box-shadow: 0 0 0 2px #fff;
    color: #fff;
    height: 20px;
    line-height: 20px;
    text-align: center;
    user-select: none;
    overflow: hidden;
    padding: 1px;
    font-size: 12px;
  }

  &.is-dot {
    .ty-badge__text {
      top: 2px;
      right: 2px;
      width: 10px;
      min-width: 10px;
      height: 10px;
      border-radius: var(--border-radius-circle);
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
