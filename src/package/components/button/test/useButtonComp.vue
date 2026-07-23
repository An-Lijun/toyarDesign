<template>
  <component :is="tag" :type="htmlType" :class="buttonClasses" :disabled="mergeDisabled" :readonly="mergeReadonly"
    :aria-disabled="mergeDisabled" @click="handleClick">
    <slot></slot>
  </component>
</template>
<script setup>
import buildProps from '../../../utils/buildProps';
import {
  nm, 
  useButton,
  useProps,
  useEmits
} from './context'

const props = defineProps(useProps)
const emits = defineEmits(useEmits)
const { htmlType, buttonClasses, loading, handleClick } = useButton(props, emits, nm)

</script>
<style lang="scss" scoped>
// useButton</style>
