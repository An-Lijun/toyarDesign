import { computed, inject } from 'vue'
import {
  formContent,
  formItemContent
} from '@/package/hooks/symbolNm'
import type { UseSwitchReturn } from './type'

export default function useSwitch(
  props: Record<string, any>,
  emit: (e: string, ...args: any[]) => void,
  model: { value: any }
): UseSwitchReturn {
  const tyForm = inject(formContent, null)
  const tyFormItem = inject(formItemContent, null)

  const isOpen = computed(() => {
    if (typeof model.value === 'boolean') {
      return model.value
    }
    return model.value === props.openValue
  })

  const disabled = computed(() => {
    return props.disabled || tyFormItem?.disabled || tyForm?.disabled || false
  })

  const click = () => {
    if (props.disabled) {
      return
    }
    model.value = model.value === props.openValue ? props.closeValue : props.openValue
    emit('change', model.value)
  }

  return {
    isOpen,
    disabled,
    click
  }
}
