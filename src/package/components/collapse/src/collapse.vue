<template>
  <div 
    :class="nm.b()"
  >
    <slot ></slot>
  </div>
</template>
<script setup lang="ts" name="TyCollapse">
import {provide} from 'vue'
import {useCompMvalue} from '../../../hooks/useCompMvalue'
import {colProps,colEmt,nm} from './context'

const props = defineProps(colProps)
const emit = defineEmits(colEmt)

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
  position:props.positionLeft,
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
