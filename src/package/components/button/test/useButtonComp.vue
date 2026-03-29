<template>
  <div :is="tag" :type="htmlType" :class="buttonClasses" :disabled="mergeDisabled" :readonly="mergeReadonly"
    :aria-disabled="mergeDisabled" @click="handleClick">
    <slot></slot>
  </div>
</template>
<script setup>
import buildProps from '../../../utils/buildProps';
import {
  nm, 
  useButton,
  propsData
} from './context'

const props = defineProps(buildProps(
  propsData
))
const emits = defineEmits()
const { htmlType, buttonClasses, loading, handleClick } = useButton(props, emits, nm)

</script>
<style lang="scss" scoped>
// useButton</style>
