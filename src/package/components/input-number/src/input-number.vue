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
  >
    <template #outPre>
      <TyButton @click="handleMinus" style="height: 100%; line-height: 100%">
        <TyIcon icon="ty-subtract-line"></TyIcon>
      </TyButton>
    </template>
    <template #outAft>
      <TyButton @click="handleAdd" style="height: 100%; line-height: 100%">
        <TyIcon icon="ty-add-fill"></TyIcon>
      </TyButton>
    </template>
  </TyInput>
</template>
<script setup lang="ts">
import { watch, useAttrs, computed } from 'vue'
import { inputProps, useCompMvalue, inputEmits } from './context'

defineOptions({
  name: 'TyInputNumber'
})
const attrs = useAttrs()

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const { model } = useCompMvalue(props, emit)

function getStringType(value: any): String {
  return Object.prototype.toString.call(value).toLowerCase()
}
function is(value: any, type: string): boolean {
  return getStringType(value) === `[object ${type.toLowerCase()}]`
}
const fomatFloat = function (value:number, n:number) {
  let per = Math.pow(10, n)
  let f = Math.round(value * per) / per
  let s = f.toString()
  let rs = s.indexOf('.')
  if (rs < 0) {
    s += '.'
  }
  for (let i = s.length - s.indexOf('.'); i <= n; i++) {
    s += '0'
  }
  return s
}
function handleFocus() {
  emit('focus')
}
function handleClear(){
  emit('clear')
}
function handleBlur(bo: boolean) {
  let value = model.value
  if (props.stepStrictly) {
    let coun = parseInt(String(value / props.step))
    let left = value - coun * props.step
    let right = (coun + 1) * props.step - value
    let noCoun = left < right ? coun : coun + 1
    emit('update:modelValue', noCoun * props.step)
  }
  if (props.precision === 0) {
    emit('update:modelValue', Math.round(value))
  }
  if (props.precision) {
    emit('update:modelValue', fomatFloat(value, props.precision))
  }
  if (!bo) {
    emit('blur')
  }
}
const handleMinus = () => {
  model.value -= props.step
  setTimeout(() => {
    handleBlur(true)
    emit('change', model.value)
  })
}
const handleAdd = () => {
  model.value = Number(model.value) + Number(props.step)
  setTimeout(() => {
    handleBlur(true)
    emit('change', model.value)
  })
}
function handleInput(value:number) {
  emit('change', value)
}

/**
 * maxlength
 * 当没有小数时候则为用户保留的
 */
const maxlength = computed(() => {
  if (!props.maxlength) {
    return Number.MAX_VALUE
  }
  return props.maxlength
})
if (is(props.maxlength, 'object')) {
  let lastRealData
  let timmer = null
  watch(
    () => model.value,
    (newV, oldV) => {
      clearTimeout(timmer)
      let reg = new RegExp(
        `^(0|[1-9]\\d{0,${props.maxlength.int - 1}})(\\.\\d{1,${
          props.maxlength.doub
        }})?$`
      )
      if (reg.test(newV)) {
        lastRealData = newV
      }
      timmer = setTimeout(() => {
        emit('update:modelValue', lastRealData)
      }, 500)
    }
  )
  //
  // let val = String(model.value).indexOf('.')
  // if (val === -1) {
  //   return props.maxlength.int + 1
  // }
  // return parseInt(Number(props.maxlength.int) + Number(props.maxlength.doub))
}
</script>

<style lang="scss" scoped>
::v-deep input::-webkit-outer-spin-button,
::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}

::v-deep input[type='number'] {
  -moz-appearance: textfield;
}
</style>
