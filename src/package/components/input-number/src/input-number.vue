<template>
  <TyInput type="number" v-model="model" v-bind="attrs">
    <template #outPre>
      <TyButton @click="handleMinus">
        <TyIcon color="var(--toyar-gray-10)" icon="ty-subtract-line"></TyIcon>
      </TyButton>
    </template>
    <template #outAft>
      <TyButton @click="handleAdd">
        <TyIcon color="var(--toyar-gray-10)" icon="ty-add-fill"></TyIcon>
      </TyButton>
    </template>
  </TyInput>
</template>
<script setup>
import { formContent, formItemContent, configProviderDisabled } from '../../../hooks/symbolNm'
import { ref, onMounted, toRefs, reactive, useSlots, useAttrs, watch } from 'vue'
import { inputProps, useCompMvalue } from './props'

const attrs = useAttrs()
const props = defineProps(inputProps)
const emit = defineEmits(['blur', 'input', 'update:modelValue'])
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
