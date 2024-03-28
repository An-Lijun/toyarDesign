<template>
  <label :class="[nm.b(), nm.is('harf', canHarf),
   nm.is('disabled', disabled)]">
    <input
      type="checkbox"
      @click="handleChange"
      :disabled="props.disabled"
      v-model="model"
      :value="value"
      :class="[nm.m(size)]"
    />
    <slot />
  </label>
</template>
<script setup lang='ts' name="TyCheckBox">
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import { nm, checkProps, checkEmits } from './context'
defineOptions({
  name:'TyCheckBox'
})
const props = defineProps(checkProps)
const emit = defineEmits(checkEmits)

const handleChange = val => {
  setTimeout(() => {
    emit('change', val)
  })
  return val
}
const { model } = useCompMvalue(props, emit, {
  setFn: handleChange
})
</script>
<style lang="scss" scoped>
.ty-check-box {
  display: inline-flex;
  align-items: center;
  user-select: none;
  color: var(--text-1);
  input {
    appearance: none;
    border-radius: var(--border-radius-4);
    background-color: var(--fill-2);
    text-align: center;
    margin: unset;
    box-sizing: border-box;
    position: relative;
    margin-right: 10px;
    &:hover {
      cursor: pointer;
    }
  }
  // ------------------------  checkBox尺寸样式  ------------------------
  $inputSize: (mini, small, medium, large);
  @mixin addCheckBoxSize($name) {
    &--#{$name} {
      height: var(--size-#{$name});
      width: var(--size-#{$name});
      line-height: var(--size-#{$name});
      font-size: calc(var(--size-#{$name}) / 2);
    }
  }

  @each $name in $inputSize {
    @include addCheckBoxSize($name);
  }
  input[type='checkbox']:checked {
    background-color: var(--primary-6);
    &::after {
      box-sizing: border-box;
      content: '✔';
      color: white;
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &.is-harf {
    input[type='checkbox']:checked::after {
      box-sizing: border-box;
      content: '—';
      color: white;
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &.is-disabled {
    color: var(--text-4);
    input {
      background-color: var(--fill-3);
      &::after{
        color: var(--text-4) !important;
      }
      &[type='checkbox']:checked {
        background-color: var(--primary-3);
      }
    }
  }
}
</style>
