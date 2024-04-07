<template>
  <label
    :class="[
      nm.b(),
      nm.is('disabled',disabled),
      nm.is('readonly',readonly),
      nm.is('error', tyFormItem && tyFormItem.formItemError.isShowErrorMsg)
    ]"
  >
    <input type="radio" v-model="model" :value="value" :class="[nm.m(size)]" />
    <slot></slot>
  </label>
</template>
<script setup>
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import { radioProps, radioEmits, nm } from './context'
import {
  formContent,
  formItemContent,
  configProviderDisabled
} from '../../../hooks/symbolNm'

defineOptions({
  name: 'TyRadio'
})
const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)

const { model } = useCompMvalue(props, emit)
const tyForm = inject(formContent, null)
const tyFormItem = inject(formItemContent, null)
// computed 继承属性
const disabled = computed(() => {
  return props.disabled || tyFormItem?.disabled || tyForm?.disabled || false
})
const readonly = computed(() => {
  return props.readonly || tyFormItem?.readonly || tyForm?.readonly|| false
})
const size = computed(() => {
  return props.size || tyFormItem?.size || tyForm?.size || 'small'
})
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
  &.is-disabled,&.is-readonly {
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
