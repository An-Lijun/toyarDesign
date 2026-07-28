<template>
  <div
    :class="[
      nm.b(),
      nm.m(size),
      nm.m(type),
      nm.is('open', isOpen),
      nm.is('disabled', disabled),
    ]"
    @click="click"
  >
    <span v-if="props.checkedText && isOpen" class="checkedText">
      {{ props.checkedText }}
    </span>
    <div :class="nm.e('boll')"></div>
    <span v-if="props.uncheckedText && !isOpen" class="uncheckedText">
      {{ props.uncheckedText }}
    </span>
  </div>
</template>
<script setup>
import { useProps, nm, useEmits } from './context'
import useSwitch from './use-switch'

defineOptions({
  name: 'TySwitch'
})

const model = defineModel('modelValue', {
  type: [Array, String, Number, Boolean],
  required: true
})
const props = defineProps(useProps)
const emit = defineEmits(useEmits)

const {
  isOpen,
  disabled,
  click
} = useSwitch(props, emit, model)
</script>
