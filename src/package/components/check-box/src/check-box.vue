<template>
  <label :class="[nm.b(), nm.is('harf', canHarf), nm.is('disabled', disabled)]">
    <input type="checkbox" hidden @click="handleChange" :disabled="disabled" v-model="model" :value="value" />
    <div :class="[nm.e('out'),nm.m(size)]">
      <div :class="[nm.e('input')]">
        <TyiSubtractLine  :class="nm.e('icon')" v-if="canHarf"></TyiSubtractLine>

        <TyiCheckLine :class="nm.e('icon')" v-else>
        </TyiCheckLine>
      </div>
    </div>
    <span :class="[nm.e('container')]">
      <slot />
    </span>
  </label>
</template>
<script setup lang="ts" name="TyCheckBox">
import { computed, inject } from 'vue'
import { nm, checkProps, checkEmits } from './context'
import {
  formContent,
  formItemContent,
  checkBoxGroup
} from '../../../hooks/symbolNm'
import {TyiCheckLine,TyiSubtractLine} from 'toyaricon'
defineOptions({
  name: 'TyCheckBox'
})
const props = defineProps(checkProps)
const emit = defineEmits(checkEmits)
const model = defineModel('modelValue', {
  required: true,
  type: [Boolean, Array]
})

const tyForm = inject(formContent, null) as {
  disabled: Boolean
  size: number
} | null
const tyFormItem = inject(formItemContent, null) as {
  disabled: Boolean
  size: number
} | null
const tyCheckBoxGroup = inject(checkBoxGroup, null) as {
  disabled: Boolean
  max: number
  size: number
  emitChange: Function
} | null


// computed 继承属性
const disabled = computed(() => {
  return (
    props.disabled ||
    tyCheckBoxGroup?.disabled ||
    tyFormItem?.disabled ||
    tyForm?.disabled ||
    (tyCheckBoxGroup &&
      Array.isArray(model.value) &&
      model.value.includes &&
      tyCheckBoxGroup.max &&
      tyCheckBoxGroup.max <= model.value.length &&
      !model.value.includes(props.value)) ||
    (props &&
      props.max &&
      Array.isArray(props.modelValue) &&
      (props.modelValue as Array<any>).includes &&
      props.max <= model.value.length &&
      !props.modelValue.includes(props.value)) ||
    false
  )
})

const size = computed(() => {
  return (
    props.size ||
    tyCheckBoxGroup?.size ||
    tyFormItem?.size ||
    tyForm?.size ||
    'small'
  )
})

if (tyCheckBoxGroup) {
  model.value = tyCheckBoxGroup?.groupValue
}

const handleChange = () => {

  if (tyCheckBoxGroup) {
    setTimeout(() => {
      tyCheckBoxGroup.emitChange(props.value)
    })
  } else {
    setTimeout(() => {
      emit('change', model.value)
    })
  }
}
</script>
