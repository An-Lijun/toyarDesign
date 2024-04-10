<template>
  <div
    ref="root"
    :class="[
      nm.b(),
      nm.m(size),
      nm.is('focus', focus),
      nm.is('disabled', disabled),
      nm.is('readonly', readonly),
      nm.is('error', tyFormItem && tyFormItem.formItemError.isShowErrorMsg)
    ]"
  >
    <!-- 输入框 -->
    <input
      type="text"
      ref="nativeInp"
      :placeholder="placeholder"
      @click.stop="isShowOption = true"
      :disabled="disabled"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <span ref="innerAft" :class="[nm.e('innerAft')]">
      <TyIcon icon="ty-arrow-down-s-line"></TyIcon>
    </span>
    <span
      v-if="isShowClearBtn"
      :class="nm.e('clear')"
      :style="{
        position: 'absolute',
        right: '10px'
      }"
      @click="clear"
    >
    </span>
    <ul :class="nm.e('group')" v-show="isShowOption">
      <slot> </slot>
      <div :class="nm.e('arrow')"></div>
    </ul>
  </div>
</template>
<script setup>
import { selectContent } from '../../../hooks/symbolNm'
import { formContent, formItemContent } from '../../../hooks/symbolNm'
import { selectOptions } from '../../../hooks/symbolNm'

import {
  ref,
  onMounted,
  toRefs,
  reactive,
  useAttrs,
  watch,
  provide,
  computed,
  inject,
  onUnmounted
} from 'vue'
import { selProps, selEmits, nm } from './context'
defineOptions({
  name: 'TySelect'
})
const props = defineProps(selProps)
const emit = defineEmits(selEmits)

const options = {}
const tyForm = inject(formContent, null)
const tyFormItem = inject(formItemContent, null)
const { disabled, readonly, modelValue, size } = toRefs(props)
const root = ref()
const nativeInp = ref()
const focus = ref(false)
let outAftWidth = ref(0)

provide(selectOptions, (label, value) => {
  options[value] = label
})
// const provideInp=reactive ({disabled})

onMounted(() => {
  setNativeInp(props.modelValue, '')
})
const isShowOption = ref(false)
function setNativeInp (value, label) {
  nativeInp.value.value = label
  emit('update:modelValue', value)
}
function getValue () {
  return props.modelValue
}
function handleInput (event) {
  // emit('update:modelValue', event.target.value)
}
function handleBlur (event) {
  if (tyForm && tyFormItem && tyFormItem.prop) {
    tyForm.validate(tyFormItem.prop, 'blur')
  }
  focus.value = false
  emit('blur', event)
}
function clear () {
  if (props.multiple) {
    emit('update:modelValue', [])
  } else {
    emit('update:modelValue', '')
  }
}
function handleFocus () {
  focus.value = true
}
let isShowClearBtn = computed(() => {
  return props.modelValue !== '' && props.clearable && !props.disabled
})
watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (props.modelValue === oldVal) {
      return
    }
    setNativeInp(newVal, options[newVal] || '')
  }
)
const closeOption = () => {
  isShowOption.value = false
}
onMounted(() => {
  document.addEventListener('click', closeOption)
})
onUnmounted(() => {
  document.removeEventListener('click', closeOption)
})
provide(selectContent, {
  setNativeInp,
  isShowOption,
  getValue,
  options,
  multiple: props.multiple
})
</script>

<style lang="scss" scoped>
.ty-select {
  display: flex;
  width: 100%;
  position: relative;
  color: var(--text-1);
  background-color: var(--fill-2);
  border-radius: var(--border-radius-4);
  border: unset;
  box-sizing: border-box;
  transition: all var(--time-5);

  input {
    width: 100%;
    flex-grow: 1;
    padding: unset;
    border: unset;
    box-sizing: border-box;
    border-radius: var(--border-radius-4);
    outline: unset;
    color: var(--text-1);
    background-color: var(--fill-2);
    padding: 0 30px 0 10px;
    &.is-outPre {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &.is-outAft {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  &__innerAft {
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    right: 10px;
    top: 0;
  }
  .ty-select__clear {
    display: none;
    height: 100%;

    &:before {
      font-family: 'toyaricon' !important;
      font-style: normal;
      display: inline-block;
      content: '\eb99';
    }
    &:hover {
      &::before {
        font-family: 'toyaricon' !important;
        font-style: normal;
        display: inline-block;
        content: '\eb97';
        cursor: pointer;
      }
    }
  }

  &:hover {
    background-color: var(--fill-3);

    input {
      background-color: var(--fill-3);
    }
    .ty-select__clear {
      background-color: var(--fill-3);
      display: block;
    }
  }

  &.is-focus {
    background-color: var(--color-bg-2);
    box-shadow: 1px 1px var(--primary-6), -1px 1px var(--primary-6),
      1px -1px var(--primary-6), -1px -1px var(--primary-6);
    input {
      background-color: var(--color-bg-2);
    }
  }

  &.is-error {
    box-shadow: 1px 1px var(--danger-6), -1px 1px var(--danger-6),
      1px -1px var(--danger-6), -1px -1px var(--danger-6);
  }
  &.is-disabled {
    background-color: var(--fill-2);
    color: var(--text-4);

    input {
      color: var(--toyar-gray-4);
      background-color: var(--fill-1);
      cursor: no-drop;
    }
  }
}

// ------------------------  input尺寸样式  ------------------------
$inputSize: (mini, small, medium, large);

@mixin addInputSize($name) {
  .ty-select--#{$name} {
    height: var(--size-#{$name});
    line-height: var(--size-#{$name});
  }
}

@each $name in $inputSize {
  @include addInputSize($name);
}
.ty-select__group {
  position: absolute;
  z-index: 2;
  top: 20px;
  box-sizing: border-box;
  list-style: none;
  padding: unset;
  border: 1px solid var(--fill-3);

  background-color: var(--color-bg-1);
  box-shadow: var(--box-shadow-5);
  width: 100%;
  border-radius: var(--border-radius-4);
  padding: 5px 0;
}
.ty-select__arrow {
  position: absolute;
  border: 1px solid var(--fill-3);
  // border-width: 8px;
  // border-color: transparent;
  border-bottom: unset;
  border-left: unset;
  background-color: var(--color-bg-1);
  width: 8px;
  height: 8px;
  // border-bottom-width: 0;
  top: -0.5px;
  left: 50%;
  z-index: -1;
  transform: translate(-50%, -50%) rotate(-45deg);

  // &::before{
  //   content: '';

  //   display: block;
  //   position: absolute;
  //   border:8px solid transparent;
  //   border-bottom-color:  var(--color-bg-1);
  //   left: -8px;
  //   bottom: -10px;
  // }
}
</style>
