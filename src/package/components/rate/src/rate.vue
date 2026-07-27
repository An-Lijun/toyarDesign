<template>
  <div :class="nm.b()">
    <span
      v-for="item in props.max"
      :class="[
        nm.e('item'),
        nm.is('actived', actived === -1 ? item <= model : item < actived)
      ]"
    >
      <component :data-star="item" :is="actived === -1
            ? item <= model
              ? icon[0]
              : icon[1]
            : item < actived
            ? icon[0]
            : icon[1]"
                style="margin: 0 5px"
          @mouseenter="handleEnter"
          @mouseleave="handleLeave"
          @click="handleClick"
      ></component>
    </span>
  </div>
</template>
<script setup>
import { nm, useProps, useEmits } from './context'
import useRate from './use-rate'

defineOptions({
  name: 'TyRate'
})

const props = defineProps(useProps)
const emit = defineEmits(useEmits)

const { model, icon, actived, handleEnter, handleLeave, handleClick } = useRate(props, emit)
</script>
<style lang="scss" scoped>
.ty-rate {

  &__item {
    &.is-actived {
      color: var(--toyar-yellow-6) ;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
