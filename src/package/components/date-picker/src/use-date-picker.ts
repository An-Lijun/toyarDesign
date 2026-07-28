import { ref, computed, watch, inject, useAttrs, nextTick, unref } from 'vue'
import { formContent, formItemContent } from '@/package/hooks/symbolNm'
import { createPopper } from '@popperjs/core'
import dayOption from './components/dayOption.vue'
import yearOption from './components/yearOption.vue'
import seasonOption from './components/seasonOption.vue'
import weekOption from './components/weekOption.vue'
import monthOption from './components/monthOption.vue'
import type { UseDatePickerReturn } from './type'

/**
 * DatePicker 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @param emit - 事件发射器
 * @param model - v-model 引用
 * @returns {UseDatePickerReturn} 返回日期选择器相关状态和方法
 */
export default function useDatePicker(
  props: Record<string, any>,
  emit: (e: string, ...args: any[]) => void,
  model: { value: string }
): UseDatePickerReturn {
  const attrs = useAttrs()
  const tyForm = inject(formContent, null)
  const tyFormItem = inject(formItemContent, null)

  const focus = ref(false)
  const isShowDatePicker = ref(false)
  const formatValue = ref('')

  let popperInstance: any = null
  const popRef = ref()
  const arrowRef = ref()
  const containerRef = ref()

  const disabled = computed(() => {
    return props.disabled || tyFormItem?.disabled || tyForm?.disabled || false
  })

  const readonly = computed(() => {
    return props.readonly || tyFormItem?.readonly || tyForm?.readonly || false
  })

  const size = computed(() => {
    return props.size || tyFormItem?.size || tyForm?.size || 'small'
  })

  const opType = computed(() => {
    switch (props.opType) {
      case 'day':
        return dayOption
      case 'year':
        return yearOption
      case 'season':
        return seasonOption
      case 'month':
        return monthOption
      case 'week':
        return weekOption
    }
  })

  const maxlength = 10

  const handleClear = () => {
    model.value = ''
    formatValue.value = ''
    emit('update:modelValue', '')
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
            element: unref(arrowRef)
          }
        }
      ]
    })
    nextTick(() => {
      popperInstance.update()
    })
  }

  const handleFocus = () => {
    isShowDatePicker.value = true
    createInstance()
  }

  const handleBlur = (isFocus: boolean) => {
    focus.value = isFocus
  }

  const handleInput = (value: string) => {
    model.value = value
    emit('input', value)
    emit('update:modelValue', value)
  }

  const selectData = (data: string) => {
    isShowDatePicker.value = false
    emit('update:modelValue', data)
  }

  const formatTime = (timestamp: string | Date) => {
    if (['year', 'season', 'week'].includes(props.opType)) {
      return timestamp
    }

    let result = props.format || 'yyyy-MM-dd'
    const date = new Date(timestamp)
    const dateObj: any = {
      'y+': date.getFullYear(),
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (const key in dateObj) {
      const keyRe = new RegExp(key)
      if (keyRe.test(result)) {
        const value = `${dateObj[key]}`.padStart(2, '0')
        result = result.replace(keyRe, value)
      }
    }
    return result
  }

  watch(
    () => props.modelValue,
    (newVal: string) => {
      if (newVal) {
        if (props?.formatValue) {
          formatValue.value = props.formatValue(newVal)
        } else {
          formatValue.value = ''
        }
      } else {
        formatValue.value = ''
      }
    },
    { immediate: true }
  )

  return {
    model,
    focus,
    isShowDatePicker,
    formatValue,
    disabled,
    readonly,
    size,
    opType,
    popRef,
    arrowRef,
    containerRef,
    tyForm,
    tyFormItem,
    handleInput,
    handleFocus,
    handleBlur,
    handleClear,
    selectData,
    formatTime,
    maxlength,
    attrs
  }
}
