<template>
  <label class="ty-radio">
    <input
      type="radio"
      v-model="model"
      :value="value"
      :class="[`ty-radio-${size}`]"
    />
    <slot></slot>
  </label>
</template>
<script setup>
import { useCompMvalue } from '../../hooks/useCompMvalue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  size: {
    type: String,
    default: 'small',
    validator: value => {
      return ['mini', 'small', 'medium', 'large'].includes(value)
    }
  },
  modelValue: {
    type: [String, Number],
    required: true,
    default: ''
  },
  value: {
    type: String,
    required: true
  }
})
const { model } = useCompMvalue(props, emit)
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
  }
  input[type='radio']:checked::after {
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
  $inputSize: (mini, small, medium, large);
  @mixin addRadioSize($name) {
    .ty-radio-#{$name} {
      height: var(--size-#{$name});
      width: var(--size-#{$name});
      line-height: var(--size-#{$name});
    }
  }

  @each $name in $inputSize {
    @include addRadioSize($name);
  }
}
</style>
