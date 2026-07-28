import { ref, computed, reactive, onMounted, inject, provide, useAttrs } from 'vue'
import {
  formContent,
  formItemContent,
  configProviderDisabled
} from '@/package/hooks/symbolNm'
import type { UseInputPasswordReturn } from './type'

export default function useInputPassword(
  props: Record<string, any>,
  emit: (e: string, ...args: any[]) => void,
  model: { value: string }
): UseInputPasswordReturn {
  const attrs = useAttrs()

  const tyForm = inject(formContent, null)
  const tyFormItem = inject(formItemContent, null)

  const nativeInp = ref()
  const innerAft = ref()

  const focus = ref(false)
  let innerPreWidth = ref(0)
  let innerAftWidth = ref(0)

  const disabled = computed(() => {
    return props.disabled || tyFormItem?.disabled || tyForm?.disabled
  })

  const readonly = computed(() => {
    return props.readonly || tyFormItem?.readonly || tyForm?.readonly
  })

  const size = computed(() => {
    return props.size || tyFormItem?.size || tyForm?.size || 'small'
  })

  const provideInp = reactive({ disabled })
  provide(configProviderDisabled, provideInp)

  onMounted(() => {
    innerAftWidth.value = innerAft?.value?.offsetWidth
  })

  const isPassworld = ref(true)

  const isShowClearBtn = computed(() => {
    return (
      props.modelValue !== '' &&
      props.clearable &&
      !disabled.value &&
      !readonly.value
    )
  })

  function handleInput(event: Event) {
    emit('input', (event.target as HTMLInputElement).value)
  }

  function handleToFocus() {
    focus.value = true
    setTimeout(() => {
      nativeInp.value.focus()
    })
  }

  function handleBlur(event: Event) {
    if (tyForm && tyFormItem && tyFormItem.prop) {
      tyForm.validate(tyFormItem.prop, 'blur')
    }
    focus.value = false
    emit('blur', event)
  }

  function handleClear() {
    emit('update:modelValue', '')
    emit('clear')
  }

  function handleEnter() {
    emit('enter', model.value)
  }

  function handleFocus() {
    focus.value = true
  }

  return {
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
    tyForm,
    tyFormItem,
    handleInput,
    handleToFocus,
    handleBlur,
    handleClear,
    handleEnter,
    handleFocus
  }
}
