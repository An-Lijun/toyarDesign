<template>
  <TyInput type="number" v-model="model" 
    v-bind="attrs"
    @input="handleInput"
    @blur="handleBlur"
    >
    <template #outPre>
      <TyButton @click="handleMinus"  style="height: 100%; line-height: 100%;">
        <TyIcon icon="ty-subtract-line"></TyIcon>
      </TyButton>
    </template>
    <template #outAft>
      <TyButton @click="handleAdd"  style="height: 100%; line-height: 100%;">
        <TyIcon icon="ty-add-fill"></TyIcon>
      </TyButton>
    </template>
  </TyInput>
</template>
<script setup>
import { formContent, formItemContent, configProviderDisabled } from '../../../hooks/symbolNm'
import { ref, onMounted, toRefs, reactive, useSlots, watch ,useAttrs } from 'vue'
import { inputProps, useCompMvalue,inputEmits} from './context'
defineOptions({
  name:'TyInputNumber'
})
const attrs = useAttrs()

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const { model } = useCompMvalue(props, emit)

const handleMinus = ()=>{
  model.value-=props.step
}
const handleAdd = ()=>{
  model.value=Number(model.value) + Number(props.step)
}
function handleInput (value) {
  emit('input', value)
}
function handleBlur(){
  let value =model.value
  console.log(value);
  if(props.stepStrictly){
    let coun = parseInt(value/ props.step)
    let left = value - coun*props.step
    let right = (coun+1)*props.step-value

    let noCoun = left<right?coun:coun+1
    emit('update:modelValue', noCoun*props.step) 
  }
}
</script>

<style lang="scss" scoped>
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}

::v-deep input[type="number"] {
  -moz-appearance: textfield;
}</style>
