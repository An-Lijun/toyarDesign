<template>
  <div :class="nm.b()" :style="{
    gap: gap + 'px'
  }">
    <template v-for="(item, index) in inputList" :key="index">
      <div :class="{
        [nm.e('item')]: true,
        [nm.is('focus')]: focusedIndex === index
      }" @click="focusInput(index)" @keydown.stop="handleKeydown">
        {{ item }}
      </div>
      <slot v-if="index < length - 1" name="split" :index="index"></slot>
    </template>
    <input ref="hiddenInputRef" v-model="hiddenInputValue" type="text" maxlength="1" :class="nm.e('hiddenInput')"
      autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" @input="handleInput"
      @keydown="handleKeydown" @blur="handleBlur" @paste="handlePaste" />
  </div>
</template>

<script setup>
import { nm, useProps, useEmits } from './context'
import useSmsCodeInput from './use-smsCodeInput'

defineOptions({
  name: 'TySmsCodeInput'
})

const props = defineProps(useProps)
const emit = defineEmits(useEmits)

const {
  inputList,
  hiddenInputRef,
  hiddenInputValue,
  focusedIndex,
  focusInput,
  handleInput,
  handleKeydown,
  handleBlur,
  handlePaste
} = useSmsCodeInput(props, emit)
</script>
