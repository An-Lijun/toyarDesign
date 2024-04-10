<template>
  <div :class="nm.bem('group')">
    <slot></slot>
  </div>
</template>
<script setup>
import {radioGroup} from '../../../hooks/symbolNm'
import { radioGroupProps, radioGroupEmits, nm } from './context'
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import { watch,provide } from 'vue';

defineOptions({
  name: 'TyRadioGroup'
})
const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)
const { model } = useCompMvalue(props, emit)

provide(radioGroup, {
  groupValue:model,
  size:props.size,
  disabled:props.disabled,
  emitChange:(value)=>{
    emit('change',value)
  }
})

</script>
<style lang="scss" scoped>
</style>
