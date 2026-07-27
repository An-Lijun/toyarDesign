import { ref, nextTick, onMounted } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { useProps } from './context'
import { type UseSmsCodeInputReturn } from './type'

/**
 * SmsCodeInput 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @param emit - 事件发射器
 * @returns {UseSmsCodeInputReturn} 返回验证码输入相关状态和方法
 */
export default function useSmsCodeInput(
  props: ExtractPropTypes<typeof useProps>,
  emit: (e: 'success' | 'update:modelValue', value?: string) => void
): UseSmsCodeInputReturn {
  function codeToRegx(allowedChars: string) {
    const escapedChars = allowedChars.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
    const regex = new RegExp(`[^${escapedChars}]`, 'g')
    return regex
  }

  const regCodes = codeToRegx(props.regCodes.join(''))

  const inputList = ref<string[]>([])
  const hiddenInputRef = ref<HTMLInputElement | null>(null)
  const hiddenInputValue = ref('')
  const focusedIndex = ref(0)

  const syncInputList = (val = '') => {
    const list: string[] = []
    const pureVal = val.replace(regCodes, '').slice(0, props.length)
    for (let i = 0; i < props.length; i++) {
      list.push(pureVal[i] || '')
    }
    inputList.value = list
  }

  syncInputList()

  const focusInput = (index?: number) => {
    const idx = index ?? 0
    if (idx < 0 || idx > props.length) return
    focusedIndex.value = idx
    nextTick(() => {
      hiddenInputRef.value?.focus()
    })
  }

  const emitValue = () => {
    const finalValue = inputList.value.join('')
    emit('update:modelValue', finalValue)
    if (finalValue.length === props.length) {
      emit('update:modelValue', finalValue)
    }
  }

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement
    const val = target.value

    if (!props.regCodes.includes(val)) {
      hiddenInputValue.value = ''
      return
    }

    inputList.value[focusedIndex.value] = val
    hiddenInputValue.value = ''
    focusedIndex.value = Math.min(focusedIndex.value + 1, props.length)
    emitValue()
  }

  const handleKeydown = (e: KeyboardEvent) => {
    const { key } = e

    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight']
    const isCodeKey = regCodes.test(key)

    if (!allowedKeys.includes(key) && isCodeKey) {
      e.preventDefault()
      return
    }

    if (focusedIndex.value >= props.length) {
      hiddenInputRef.value?.blur()
      return
    }

    switch (key) {
      case 'Backspace':
        inputList.value[focusedIndex.value] = ''

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

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault()

    const clipBoard = e.clipboardData || window.clipboardData

    if (!clipBoard) return
    const pasteVal = clipBoard.getData('text') || ''
    if (!pasteVal) return

    const pureVal = pasteVal.replace(regCodes, '').slice(0, props.length)
    if (!pureVal) return

    syncInputList(pureVal)

    focusedIndex.value = Math.min(pureVal.length, props.length - 1)
    emitValue()
  }

  onMounted(() => {
    focusInput()
  })

  return {
    inputList,
    hiddenInputRef,
    hiddenInputValue,
    focusedIndex,
    focusInput,
    handleInput,
    handleKeydown,
    handleBlur,
    handlePaste
  }
}
