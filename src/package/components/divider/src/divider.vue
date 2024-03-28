<template>
  <div :class="[nm.b(), nm.bem(direction)]">
    <span
      :class="[nm.e('inner'), nm.bem('','inner', position)]"
      v-if="useSlots().default"
    >
      <slot> </slot>
    </span>
  </div>
</template>
<script lang="ts" setup name="TyDivider">
import { useSlots } from 'vue'
import { dividerProps, nm } from './context'

defineOptions({
  name:'TyDivider'
})
defineProps(dividerProps)
</script>
<style lang="scss" scoped>
.ty-divider {
  &>.ty-divider__inner {
    position: absolute;
    background-color: var(--color-bg-1);
    font-weight: var(--font-weight-5);
    color: var(--toyar-gray-10);
    font-size: var(--font-body-3);
    padding: 0 var(--padding-2);
  }
  &-row {
    background-color: var(--toyar-gray-2);
    height: var(--border-1);
    width: 100%;
    margin: var(--padding-2) 0;
    position: relative;
    &>.ty-divider__inner {
      &--left {
        left: 0;
        transform: translate(50%, -50%);
      }
      &--center {
        left: 50%;
        transform: translate(-50%, -50%);
      }
      &--right {
        right: 0;
        transform: translate(-50%, -50%);
      }
    }
  }
  &-column {
    background-color: var(--toyar-gray-2);
    width: var(--border-1);
    height: 100%;
    margin: 0 var(--padding-2);
    position: relative;
    &>.ty-divider__inner {
       padding: var(--padding-1) 0 ;

      &--top {
        top: 0;
        transform: translate(-50%, 50%);
      }

      &--center {
        top: 50%;
        transform: translate(-50%, -50%);
      }
      &--bottom {
        bottom: 0;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
