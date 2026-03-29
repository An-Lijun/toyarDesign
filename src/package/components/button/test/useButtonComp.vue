<template>
  <div :is="tag" :type="htmlType" :class="buttonClasses" :disabled="mergeDisabled" :readonly="mergeReadonly"
    :aria-disabled="mergeDisabled" @click="handleClick">

    <slot></slot>
  </div>
</template>
<script setup>
import useButton from '../src/use-button.ts'
import useNmSpace from '../../../hooks/useBem'
import buildProps from '../../../utils/buildProps';
import { TY_STATE, TY_SIZE } from '../../../constant';

const props= defineProps(buildProps(
  {
    state: {
      type: String,
      values: TY_STATE,
      default: "primary",
    },
    type: {
      type: String,
      default: "normal",
      values: ["normal", "secondary", 'outline', "dashed", 'text', 'link']
    },
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "small",
      values: TY_SIZE
    },
    'html-type': {
      type: String,
      default: "button",
      values: ["button", "submit", "reset"]
    },
    shape: {
      type: String,
      default: "square",
      values: ["square", "round", "circle"]
    },
    loading: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String,
      default: 'button',
    },
  }
))
const emits = defineEmits()
const nm=useNmSpace('button')
const { htmlType, buttonClasses, loading, handleClick } = useButton(props, emits, nm)


</script>
<style lang="scss" scoped>
// useButton</style>
