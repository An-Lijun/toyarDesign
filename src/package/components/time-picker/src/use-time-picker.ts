import { ref, computed, inject, useAttrs, nextTick, unref } from 'vue'
import { createPopper } from '@popperjs/core'
import { formContent, formItemContent } from '@/package/hooks/symbolNm'
import type { UseTimePickerReturn } from './type'

export default function useTimePicker(
  props: Record<string, any>,
  emit: (e: string, ...args: any[]) => void,
  model: { value: string }
): UseTimePickerReturn {
  const attrs = useAttrs()
  const tyForm = inject(formContent, null)
  const tyFormItem = inject(formItemContent, null)

  let popperInstance: any = null
  const popRef = ref()
  const arrowRef = ref()
  const containerRef = ref()
  const isShowTimePicker = ref(false)

  const disabled = computed(() => {
    return props.disabled || tyFormItem?.disabled || tyForm?.disabled || false
  })

  const readonly = computed(() => {
    return props.readonly || tyFormItem?.readonly || tyForm?.readonly || false
  })

  const size = computed(() => {
    return props.size || tyFormItem?.size || tyForm?.size || 'small'
  })

  const hours = ref(24)
  const minutes = ref(60)
  const seconds = ref(60)
  const value = ref([0, 0, 0])
  const focus = ref(false)
  const maxlength = ref()

  const selectHour = (val: number) => {
    value.value[0] = val
  }

  const selectMinute = (val: number) => {
    value.value[1] = val
  }

  const selectSecond = (val: number) => {
    value.value[2] = val
  }

  const confirm = () => {
    model.value = value.value.join(':')
    isShowTimePicker.value = false
    emit('update:modelValue', model.value)
  }

  const createInstance = () => {
    popperInstance = createPopper(unref(containerRef), unref(popRef), {
      placement: 'bottom',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 5]
          }
        },
        {
          name: 'arrow',
          options: {
            element: unref(arrowRef),
          }
        }
      ]
    })
    nextTick(() => {
      popperInstance.update()
    })
  }

  const handleFocus = () => {
    isShowTimePicker.value = true
    createInstance()
  }

  const handleInput = (event: Event) => {
    emit('input', (event.target as HTMLInputElement).value)
  }

  const handleBlur = () => {
    emit('blur', model.value)
  }

  const handleClear = () => {
    emit('update:modelValue', '')
  }

  const formatTime = () => {
    return props.formatValue ? props.formatValue(model.value) : model.value
  }

  return {
    attrs,
    tyForm,
    tyFormItem,
    popRef,
    arrowRef,
    containerRef,
    isShowTimePicker,
    disabled,
    readonly,
    size,
    hours,
    minutes,
    seconds,
    value,
    focus,
    maxlength,
    selectHour,
    selectMinute,
    selectSecond,
    confirm,
    handleFocus,
    handleInput,
    handleBlur,
    handleClear,
    formatTime
  }
}
