<template>
  <div :class="nm.b()">
    <span
      v-for="item in props.max"
      :class="[
        nm.e('item'),
        nm.is('actived', actived === -1 ? item <= model : item < actived)
      ]"
    >
      <TyIcon
        :data-star="item"
        :icon="
          actived === -1
            ? item <= model
              ? icon[0]
              : icon[1]
            : item < actived
            ? icon[0]
            : icon[1]
        "
        style="margin: 0 5px"
        @mouseenter="handleEnter"
        @mouseleave="handleLeave"
        @click="handleClick"
      ></TyIcon>
    </span>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import TyIcon from '../../icon'
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import { rateProps, rateEmits, nm } from './context'

const props = defineProps(rateProps)
const emit = defineEmits(rateEmits)

const { model } = useCompMvalue(props, emit)
defineOptions({
  name:'TyRate'
})
const initIcon = () => {
  return props.allowHalf
    ? ['ty-star-half-fill', 'ty-star-half-line']
    : ['ty-star-fill', 'ty-star-line']
}
let icon = ref(initIcon())
let actived = ref(-1)

const handleEnter = $event => {
  const target = $event.target
  actived.value = Number(target.getAttribute('data-star')) + 1
}
const handleLeave = $event => {
  actived.value = -1
}
const handleClick = $event => {
  const target = $event.target
  emit('update:modelValue', Number(target.getAttribute('data-star')))
}
// line:fille
// ty-star-fill
// ty-star-half-line
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
