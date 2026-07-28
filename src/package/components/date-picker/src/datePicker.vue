<template>
  <div :class="[
    nm.b(),
    nm.m(size),
    nm.is('focus', focus),
    nm.is('disabled', disabled),
    nm.is('readonly', readonly),
    nm.is(
      'error',
      (tyFormItem && tyFormItem.formItemError.isShowErrorMsg) || false
    )
  ]" ref="containerRef">
    <TyInput v-model="model" :format="formatTime" v-bind="attrs" @input="handleInput" @focus="handleFocus"
      @blur="handleBlur(false)" @clear="handleClear" :maxlength="maxlength" inputmode="numeric">
      <template #innerAft>
        <TyiCalendarLine/>
      </template>
    </TyInput>
    <div ref="popRef" :class="[nm.e('box')]" v-show="isShowDatePicker" :style="`top: var(--size-${size});`">
      <component :is="opType" @selectData="selectData"></component>
      <div ref="arrowRef" data-popper-arrow :class="nm.e('arrow')">
      </div>
    </div>
  </div>
</template>
<script setup>
import { TyiCalendarLine } from 'toyaricon'
import TyInput from '../../input'
import { useProps, nm, useEmits } from './context'
import useDatePicker from './use-date-picker'

defineOptions({
  name: 'TyDatePicker'
})

const model = defineModel()
const props = defineProps(useProps)
const emit = defineEmits(useEmits)

const {
  focus,
  isShowDatePicker,
  disabled,
  readonly,
  size,
  opType,
  popRef,
  arrowRef,
  containerRef,
  tyFormItem,
  handleInput,
  handleFocus,
  handleBlur,
  handleClear,
  selectData,
  formatTime,
  maxlength,
  attrs
} = useDatePicker(props, emit, model)
</script>
