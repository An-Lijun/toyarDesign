<template>
  <TyInput
    type="number"
    v-model="model"
    v-bind="attrs"
    @input="handleInput"
    @focus="handleFocus"
    @blur="handleBlur(false)"
    @clear="handleClear"
    :maxlength="maxlength"
    inputmode="numeric"
  >
    <template #outPre>
      <TyButton @click="handleMinus" style="height: 100%; line-height: 100%">
        <TyiSubtractLine icon="ty-subtract-line" color="#fff"></TyiSubtractLine>
      </TyButton>
    </template>
    <template #outAft>
      <TyButton @click="handleAdd" style="height: 100%; line-height: 100%">
        <TyiAddFill icon="ty-add-fill" color="#fff"></TyiAddFill>
      </TyButton>
    </template>
  </TyInput>
</template>
<script setup>
import { TyiAddFill, TyiSubtractLine } from 'toyaricon'
import { useProps, nm, useEmits } from './context'
import useInputNumber from './use-input-number'

defineOptions({
  name: 'TyInputNumber'
})

const model = defineModel('modelValue')
const props = defineProps(useProps)
const emit = defineEmits(useEmits)

const {
  attrs,
  maxlength,
  handleFocus,
  handleClear,
  handleBlur,
  handleMinus,
  handleAdd,
  handleInput
} = useInputNumber(props, emit, model)
</script>

<style lang="scss" scoped>
:deep(input)::-webkit-outer-spin-button,
:deep(input)::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}

:deep(input)[type='number'] {
  -moz-appearance: textfield;
}
</style>
