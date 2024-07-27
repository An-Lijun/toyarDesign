<template>
  <label :class="[nm.b(), nm.is('harf', canHarf), nm.is('disabled', disabled)]">
    <input type="checkbox" @click="handleChange" :disabled="disabled" v-model="model" :value="value"
      :class="[nm.m(size)]" />
    <slot />
  </label>
</template>
<script setup lang="ts" name="TyCheckBox">
import { computed, inject } from 'vue'
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import { nm, checkProps, checkEmits } from './context'
import {
  formContent,
  formItemContent,
  checkBoxGroup
} from '../../../hooks/symbolNm'

defineOptions({
  name: 'TyCheckBox'
})
const props = defineProps(checkProps)
const emit = defineEmits(checkEmits)
const model = defineModel('modelValue', {
  required: true,
  type: [Boolean,Array]
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
  model = tyCheckBoxGroup?.groupValue
}

const handleChange = () => {
  if (tyCheckBoxGroup) {
    setTimeout(() => {
      tyCheckBoxGroup.emitChange(model.value)
    })
  } else {
    setTimeout(() => {
      emit('change', model.value)
    })
  }
}
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
  $inputSize: (
    mini,
    small,
    medium,
    large
  );

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

    &::after {
      color: var(--text-4) !important;
    }

    &[type='checkbox']:checked {
      background-color: var(--primary-3);
    }

    &:hover {
      cursor: not-allowed;
    }
  }
}
}
</style>
