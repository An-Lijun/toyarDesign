<template>
  <div
    :class="[
      nm.b(),
      nm.m(size),
      nm.is('focus',focus),
      nm.is('disabled',Boolean(disabled)),
      nm.is('readonly',Boolean(readonly)),
      nm.is('error',tyFormItem && tyFormItem.formItemError.isShowErrorMsg),
    ]"
  >
    <input
      :type="isPassworld ? 'password' : 'text'"
      :maxlength="attrs.maxlength"
      ref="nativeInp"
      v-model="model"
      :style="[
        {
          paddingLeft: `${innerPreWidth + 20}px`,
          paddingRight: `${(innerAftWidth > 0 ? innerAftWidth : 16) + 20}px`
        }
      ]"
      :disabled="disabled"
      :readonly="readonly"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      @keydown.enter="handleEnter"
    />

    <span
      ref="innerAft"
      :class="nm.e('innerAft')"
      @click="isPassworld = !isPassworld"
    >
    <TyiEyeOffLine v-if="isPassworld"/>
    <TyiEyeLine v-else/>
 
    </span>
    <span
      v-if="isShowClearBtn"
      :class="nm.is('clear')"
      :style="{
        position: 'absolute',
        right: '30px',
        top: '0'
      }"
      @click="handleClear"
    >
    </span>
  </div>
</template>
<script setup>
import { TyiEyeOffLine, TyiEyeLine } from 'toyaricon'
import { useProps, nm, useEmits } from './context'
import useInputPassword from './use-input-password'

defineOptions({
  name: 'TyInputPassword'
})

const model = defineModel('modelValue')
const props = defineProps(useProps)
const emit = defineEmits(useEmits)

const {
  attrs,
  nativeInp,
  innerAft,
  focus,
  innerPreWidth,
  innerAftWidth,
  disabled,
  readonly,
  size,
  isPassworld,
  isShowClearBtn,
  tyFormItem,
  handleInput,
  handleBlur,
  handleFocus,
  handleEnter,
  handleClear
} = useInputPassword(props, emit, model)
</script>
