<template>
  <div 
    :class="nm.b()"
  >
    <slot ></slot>
  </div>
</template>
<script setup lang="ts" name="TyCollapse">
import {provide} from 'vue'
import {colProps,colEmt,nm} from './context'
defineOptions({
  name:'TyCollapse'
})
const props = defineProps(colProps)
const emit = defineEmits(colEmt)
const model = defineModel({ required: true })

const itemChange=(value)=>{
  model.value= value
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
  color: var(--text-1);
}
</style>
