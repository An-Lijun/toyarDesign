<template>
  <div 
    class="ty-collapse"
  >
    <slot :disabled="props.disabled" :accordion="props.accordion"></slot>
  </div>
</template>
<script setup>
import {provide} from 'vue'
import {useCompMvalue} from '../../../hooks/useCompMvalue'
const props = defineProps({
  modelValue: {
    type: Array
  },
  disabled: {
    type: Boolean,
    default:false
  },
  accordion: {
    type: Boolean,
    default:false
  },
  hide: {
    type: Boolean,
    default:false
  },
  hide: {
    type: Boolean,
    default:false
  },
  position:{
    type:String,
    default:'right'
  },
  destroy:{
    type: Boolean,
    default:false
  }
})
const emit = defineEmits(['update:modelValue'])
const {model} =useCompMvalue(props,emit)

const itemChange=(value)=>{
  emit('update:modelValue',value)
} 
provide('collapseValue',{
  model,
  itemChange,
  disabled:props.disabled,
  accordion:props.accordion,
  hide:props.hide,
  position:props.position,
  destroy:props.destroy
})

</script>
<style lang="scss" scoped>
.ty-collapse{
  width: 100%;
  border: 1px solid var(--border-color-2);
  box-sizing: border-box;
}
</style>
