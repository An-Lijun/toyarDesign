<template>
  <TyInput type="number" v-model="model" 
    v-bind="attrs"
    >
    <template #outPre>
      <TyButton @click="handleMinus"  style="height: 100%;">
        <TyIcon color="#fff" icon="ty-subtract-line"></TyIcon>
      </TyButton>
    </template>
    <template #outAft>
      <TyButton @click="handleAdd"  style="height: 100%;">
        <TyIcon color="#fff" icon="ty-add-fill"></TyIcon>
      </TyButton>
    </template>
  </TyInput>
</template>
<script setup>
import { formContent, formItemContent, configProviderDisabled } from '../../../hooks/symbolNm'
import { ref, onMounted, toRefs, reactive, useSlots, watch ,useAttrs } from 'vue'
import { inputProps, useCompMvalue,inputEmits} from './context'

const attrs = useAttrs()

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)
const { model } = useCompMvalue(props, emit)

const handleMinus = ()=>{
  model.value--
}
const handleAdd = ()=>{
  model.value++
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
