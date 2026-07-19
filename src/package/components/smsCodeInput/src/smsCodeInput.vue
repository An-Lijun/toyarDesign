<template>
  <div :class="nm.b()" :style="{
    gap:gap+'px'
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
import { nm, smsEmit, smsCodeProps } from './context'
import { nextTick, onMounted } from 'vue'


defineOptions({
  name: 'TySmsCodeInput'
})
const props = defineProps(smsCodeProps)
const emit = defineEmits(smsEmit)
const model = defineModel()

function codeToRegx(allowedChars) {
  // 步骤1：转义正则特殊字符（避免[]^-等字符导致正则报错）
  const escapedChars = allowedChars.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  // 步骤2：动态拼接正则表达式（[^允许字符集] 表示匹配不在字符集中的任意字符）
  const regex = new RegExp(`[^${escapedChars}]`, 'g')
  return regex
}

const regCodes = codeToRegx(props.regCodes.join(''))


const inputList = ref([])
const hiddenInputRef = ref()
const hiddenInputValue = ref('')
const focusedIndex = ref(0)
const syncInputList = (val = '') => {
  const list = []
  // 过滤非数字并截断到指定长度
  const pureVal = val.replace(regCodes, '').slice(0, props.length)
  for (let i = 0; i < props.length; i++) {
    list.push(pureVal[i] || '')
  }
  inputList.value = list
}
syncInputList()



const focusInput = (index) => {
  if (index < 0 || index > props.length) return
  focusedIndex.value = index
  nextTick(() => {
    hiddenInputRef.value.focus()
  })
}

const emitValue = () => {
  const finalValue = inputList.value.join('')
  emit('update:modelValue', finalValue)
  // 可选：触发完成事件（所有框都填完时）
  if (finalValue.length === props.length) {
    emit('update:modelValue', finalValue)
  }
}

const handleInput = (e) => {
  const val = e.target.value

  if (!props.regCodes.includes(val)) {
    hiddenInputValue.value = ''
    return
  }

  // 只保留数字/字母，可根据需要调整正则
  // 自动跳转到下一个输入框

  inputList.value[focusedIndex.value] = val
  hiddenInputValue.value = ''
  focusedIndex.value = Math.min(focusedIndex.value + 1, props.length)
  emitValue()
}
const handleKeydown = (e) => {
  const { key } = e

  // 仅处理指定的功能键和数字键
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight']
  const isCodeKey = regCodes.test(key)
  // 非允许键直接阻止默认行为
  if (!allowedKeys.includes(key) && isCodeKey) {
    e.preventDefault()
    return
  }

  if (focusedIndex.value >= props.length) {
    hiddenInputRef.value.blur()
    return
  }

  switch (key) {
    case 'Backspace':
      inputList.value[focusedIndex.value] = ''

      // // 删除当前字符，光标回退
      if (focusedIndex.value === hiddenInputValue.value.length) {
        focusedIndex.value = Math.max(0, hiddenInputValue.value.length - 1)
      } else {
        focusedIndex.value = Math.max(0, focusedIndex.value - 1)
      }
      emitValue()
      break

    case 'ArrowLeft':
      focusedIndex.value = Math.max(0, focusedIndex.value - 1)
      break
    case 'ArrowRight':
      focusedIndex.value = Math.min(props.length - 1, focusedIndex.value + 1)
      break
  }
}
const handleBlur = () => {
  focusedIndex.value = -1
}
const handlePaste = (e) => {
  e.preventDefault() // 阻止默认粘贴行为
  // 获取粘贴的内容

  const clipBoard = e.clipboardData || window.clipboardData

  // 兼容性 如果不支持clipboard 则返回
  if (!clipBoard) return
  const pasteVal = clipBoard.getData('text') || ''
  if (!pasteVal) return

  // 过滤非数字，截断到指定长度
  const pureVal = pasteVal.replace(regCodes, '').slice(0, props.length)
  if (!pureVal) return

  // 同步到inputList

  syncInputList(pureVal)

  // 光标定位到最后一个已输入字符的下一位
  focusedIndex.value = Math.min(pureVal.length, props.length - 1)
  // 通知父组件
  emitValue()
}
onMounted(() => {
  focusInput()
})
</script>
