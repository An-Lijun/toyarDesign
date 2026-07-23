import { computed, inject, type ComputedRef, type ExtractPropTypes } from 'vue'
import { configProviderDisabled } from '../../../hooks/symbolNm'
import useNmSpace from '@/package/hooks/useBem'
import type { ButtonEmits } from './context'
import { useProps } from './context'

export interface UseButtonReturn {
  htmlType: ComputedRef<string>
  buttonClasses: ComputedRef<string[]>
  mergeDisabled: ComputedRef<boolean>
  mergeReadonly: ComputedRef<boolean>
  handleClick: (event: MouseEvent) => void
}

export default function useButton(
  props: ExtractPropTypes<typeof useProps>,
  emit: ButtonEmits,
  nm: ReturnType<typeof useNmSpace>
): UseButtonReturn {
  const inputInject = inject(configProviderDisabled, () => ({
    disabled: false,
    readonly: false
  }))

  const mergeDisabled = computed(() =>
    inputInject.disabled || props.disabled || props.loading
  )
  const mergeReadonly = computed(() =>
    inputInject.readonly || props.loading
  )

  const htmlType = computed(() => props['html-type'])

  const buttonClasses = computed(() => [
    nm.b(),
    nm.m(props.state),
    nm.m(props.type),
    nm.m(props.size),
    nm.m(props.shape),
    nm.is('disabled', mergeDisabled.value),
    nm.is('readonly', mergeReadonly.value),
    nm.is('block', props.block),
  ])

  const handleClick = (event: MouseEvent) => {
    if (mergeDisabled.value || mergeReadonly.value) {
      event.preventDefault()
      return
    }
    emit('click', event)
  }

  return { htmlType, buttonClasses, mergeDisabled, mergeReadonly, handleClick }
}
