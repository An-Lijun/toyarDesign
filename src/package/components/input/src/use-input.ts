import { ref, computed, reactive, onMounted, watch, inject, provide, useAttrs } from 'vue'
import {
  formContent,
  formItemContent,
  configProviderDisabled
} from '@/package/hooks/symbolNm'
import { nm } from './context'
import type { UseInputReturn } from './type'

/**
 * Input 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @param emit - 事件发射器
 * @param model - v-model 引用
 * @returns {UseInputReturn} 返回输入框相关状态和方法
 */
export default function useInput(
  props: Record<string, any>,
  emit: (e: string, ...args: any[]) => void,
  model: { value: string }
): UseInputReturn {
  const attrs = useAttrs()
  const tyForm = inject(formContent, null)
  const tyFormItem = inject(formItemContent, null)

  const limitBlock = ref()
  const nativeInp = ref()
  const outPre = ref()
  const innerPre = ref()
  const outAft = ref()
  const innerAft = ref()
  const nativeFormatInp = ref()
  const focus = ref(false)
  let outPreWidth = ref(0)
  const formatValue = ref('')
  let limitBlockWidth = ref(0)
  let innerPreWidth = ref(0)
  let outAftWidth = ref(0)
  let innerAftWidth = ref(0)
  let isShowFormatSelf = ref(true)

  const isShowFormat = computed(() => {
    return props.format && isShowFormatSelf.value
  })

  const disabled = computed(() => {
    return props.disabled || tyFormItem?.disabled || tyForm?.disabled || false
  })

  const readonly = computed(() => {
    return props.readonly || tyFormItem?.readonly || tyForm?.readonly || false
  })

  const size = computed(() => {
    return props.size || tyFormItem?.size || tyForm?.size || 'small'
  })

  const provideInp = reactive({ disabled, readonly })
  provide(configProviderDisabled, provideInp)

  onMounted(() => {
    outPreWidth.value = outPre?.value?.offsetWidth
    innerPreWidth.value = innerPre?.value?.offsetWidth
    outAftWidth.value = outAft?.value?.offsetWidth
    innerAftWidth.value = innerAft?.value?.offsetWidth
    limitBlockWidth.value = limitBlock?.value?.offsetWidth || 0
  })

  function handleInput(event: Event) {
    limitBlockWidth.value = limitBlock?.value?.offsetWidth || 0
    const target = event.target as HTMLInputElement
    emit('input', target.value)
  }

  function handleToFocus() {
    emit('focus')
    focus.value = true
    isShowFormatSelf.value = false
    setTimeout(() => {
      nativeInp.value.focus()
    })
  }

  function handleBlur(event: Event) {
    if (tyForm && tyFormItem && tyFormItem.prop) {
      tyForm.validate(tyFormItem.prop, 'blur')
    }
    emit('blur', event)
    isShowFormatSelf.value = true
    focus.value = false
    if (nativeFormatInp?.value) {
      nativeFormatInp.value.blur()
    }
  }

  function handleClear() {
    focus.value = false
    emit('update:modelValue', '')
    emit('clear')
  }

  function handleEnter() {
    emit('enter', model.value)
  }

  const isShowClearBtn = computed(() => {
    return (
      props.modelValue !== '' &&
      props.clearable &&
      !disabled.value &&
      !readonly.value
    )
  })

  if (props.format) {
    watch(
      model,
      (newVal: string) => {
        if (newVal) {
          if (props?.format) {
            formatValue.value = props.format(newVal)
          } else {
            formatValue.value = ''
          }
        } else {
          formatValue.value = ''
        }
      },
      { immediate: true }
    )
  }

  const inputClass = computed(() => [
    nm.b(),
    nm.m(size.value),
    nm.is('focus', focus.value),
    nm.is('disabled', disabled.value),
    nm.is('readonly', readonly.value),
    nm.is('error', tyFormItem && tyFormItem.formItemError.isShowErrorMsg)
  ])

  return {
    attrs,
    limitBlock,
    nativeInp,
    outPre,
    innerPre,
    outAft,
    innerAft,
    nativeFormatInp,
    focus,
    outPreWidth,
    formatValue,
    limitBlockWidth,
    innerPreWidth,
    outAftWidth,
    innerAftWidth,
    isShowFormatSelf,
    isShowFormat,
    disabled,
    readonly,
    size,
    isShowClearBtn,
    inputClass,
    tyForm,
    tyFormItem,
    handleInput,
    handleToFocus,
    handleBlur,
    handleClear,
    handleEnter,
    model,
    provideInp
  }
}
