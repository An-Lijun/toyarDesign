<template>
  <label :class="[nm.b(), nm.is('harf', canHarf), nm.is('disabled', disabled)]">
    <input type="checkbox" hidden @click="handleChange" :disabled="disabled" v-model="model" :value="value" />
    <div :class="[nm.e('out'),nm.m(size)]">
      <div :class="[nm.e('input')]">
        <TyIcon icon="ty-subtract-line" :class="nm.e('icon')" v-if="canHarf"></TyIcon>
        <TyIcon icon="ty-check-line" :class="nm.e('icon')" v-else>
        </TyIcon>
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
<style lang="scss" scoped>
.ty-check-box {
  display: inline-flex;
  align-items: center;
  user-select: none;
  color: var(--text-1);

  &__icon {
    display: none;
    color: white;
    height: 100%;
    width: 100%;
  }

  &__out {
    border-radius: var(--border-radius-circle);
    margin-right: 10px;
    transition: background-color 0.5s ease;

    &:hover {
      cursor: pointer;
      background-color: var(--fill-3);
    }
  }

  &__input {
    appearance: none;
    border-radius: var(--border-radius-4);
    // background-color: var(--fill-2);
    border: 2px solid var(--fill-2);
    text-align: center;
    margin: unset;
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    &:hover {
      cursor: pointer;
    }
  }

  // ------------------------  checkBox尺寸样式  ------------------------
  $inputSize: (
    mini:5,
    small:8,
    medium:11,
    large:14
  );

&__container {
  margin-right: 10px;
}

@mixin addCheckBoxSize($name,$value) {
  &--#{$name} {
    .ty-check-box__input {
      height: var(--size-#{$name});
      width: var(--size-#{$name});
      line-height: var(--size-#{$name});
      font-size: calc(var(--size-#{$name}) / 2);
    }
    padding: #{$value}px;
  }
}

@each $name,$value in $inputSize {
  @include addCheckBoxSize($name,$value);
}

input:checked+.ty-check-box__out {
  background-color: unset !important;

  .ty-check-box__input {
    background-color: var(--primary-6);
    display: flex;
    justify-content: center;
    align-items: center;
    border-color: var(--primary-6);

    .ty-check-box__icon {
      display: inline-flex;
      position: absolute;
    }

  }
}

&.is-disabled {
  color: var(--text-4);

  .ty-check-box__input {
    background-color: var(--fill-3);
    border-color: var(--fill-3);

    &:hover {
      cursor: not-allowed;
    }
  }

  .ty-check-box__out {
    background: unset;
  }
}
}
</style>
