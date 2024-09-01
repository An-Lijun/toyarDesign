<template>
  <div :class="nm.bem('group')">
    <slot></slot>
  </div>
</template>
<script setup>
import { nm, checkGroupProps, checkGroupEmits } from './context'
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import {checkBoxGroup} from '../../../hooks/symbolNm'
import { provide } from 'vue';

defineOptions({
  name: 'TyCheckBoxGroup'
})
const props = defineProps(checkGroupProps)
const emit = defineEmits(checkGroupEmits)
const { model } = useCompMvalue(props, emit)

provide(checkBoxGroup, {
  groupValue:model,
  size:props.size,
  disabled:props.disabled,
  max:props.max,
  emitChange:(value)=>{
    let arr=[]
    if(model.value.includes(value)){
      arr = model.value.filter(item=>item !==value)
    }else{
      arr = [...model.value,value]
    }
    console.log(arr);
    
    emit('update:modelValue',arr)
  }
})
</script>
<style lang="scss" scoped>
</style>
