<template>
  <div
    :class="[
      nm.b(),
      nm.is('border', border),
      nm.is('shadow', shadow === 'shadow'),
      nm.is('hoverShadow', shadow === 'hover')
    ]"
  >
    <header :class="nm.e('header')" v-if="useSlots().header">
      <slot name="header"></slot>
    </header>
    <main :class="nm.e('main')">
      <slot></slot>
    </main>
  </div>
</template>
<script setup lang='ts' name="TyCard">
import { useSlots, computed } from 'vue'
import { cardProp,nm } from './context'

const props = defineProps(cardProp)

</script>
<style lang="scss" scoped>
.ty-card {
  border-radius: var(--border-radius-4);
  background-color: var(--color-bg-2);
  color: var(--text-1);
  transition: box-shadow 0.5s;

  &__header {
    border-bottom: var(--border-1) solid var(--border-color-2);
    padding: var(--padding-2);
  }

  &__main {
    padding: var(--padding-2);
  }

  &.is-border {
    border: var(--border-1) solid var(--border-color-2);
  }

  &.is-shadow {
    box-shadow: var(--box-shadow-5);
  }

  &.is-hoverShadow {
    &:hover {
      box-shadow: var(--box-shadow-5);
    }
  }
}
</style>
