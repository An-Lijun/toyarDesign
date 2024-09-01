<template>
  <label
    :class="[
      nm.b(),
      nm.is('disabled', disabled),
      nm.is('readonly', readonly),
    ]"
  >
    <input
      type="radio"
      v-model="model"
      @click="handleChange"
      :value="value"
      :class="[nm.m(size)]"
      :disabled="disabled"
    />
    <span :class="nm.e('container')">
      <slot></slot>
    </span>
  </label>
</template>
<script setup>
import { inject, computed } from 'vue'
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import { radioProps, radioEmits, nm } from './context'
import {
  formContent,
  formItemContent,
  configProviderDisabled,
  radioGroup
} from '../../../hooks/symbolNm'
defineOptions({
  name: 'TyRadio'
})
const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)

let { model } = useCompMvalue(props, emit)
const tyForm = inject(formContent, null)
const tyFormItem = inject(formItemContent, null)
const tyRadioGroup = inject(radioGroup, null)

// computed 继承属性
const disabled = computed(() => {
  return props.disabled ||tyRadioGroup?.disabled || tyFormItem?.disabled || tyForm?.disabled || false
})
const readonly = computed(() => {
  return props.readonly || tyFormItem?.readonly || tyForm?.readonly || false
})
const size = computed(() => {
  return props.size|| tyRadioGroup?.size || tyFormItem?.size || tyForm?.size || 'small'
})
if (tyRadioGroup) {
  model=tyRadioGroup.groupValue
}

const handleChange = () => {
  if(tyRadioGroup){
    tyRadioGroup.emitChange(props.value)
  }else{
    emit('change', props.value)
  }
}
</script>

<style lang="scss" scoped>
.ty-radio {
  display: inline-flex;
  align-items: center;
  user-select: none;
  box-sizing: border-box;

  input {
    appearance: none;
    border-radius: var(--border-radius-circle);
    border: var(--border-2) solid var(--primary-6);
    position: relative;
    margin: unset;
    margin-right: 10px;
    background-color: var(--fill-2);
    &[type='radio']:checked::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      border-radius: var(--border-radius-circle);
      background-color: var(--primary-6);
      width: 60%;
      height: 60%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &__container{
    margin-right: 10px;
  }
  &:hover {
    cursor: pointer;
  }
  $inputSize: (mini, small, medium, large);
  @mixin addRadioSize($name) {
    .ty-radio--#{$name} {
      height: var(--size-#{$name});
      width: var(--size-#{$name});
      line-height: var(--size-#{$name});
    }
  }
  @each $name in $inputSize {
    @include addRadioSize($name);
  }
  &.is-disabled,
  &.is-readonly {
    input {
      border-color: var(--primary-3);
      &[type='radio']:checked::after {
        background-color: var(--primary-3);
      }
    }
    color: var(--text-4);
    &:hover {
      cursor: no-drop;
    }
  }
}
</style>
