import { computed, inject, type ComputedRef } from 'vue'
import { configProviderDisabled } from '../../../hooks/symbolNm'

export interface UseButtonReturn {
  htmlType: ComputedRef<string>
  buttonClasses: ComputedRef<string[]>
  loading: ComputedRef<boolean>
  handleClick: (event: MouseEvent) => void
}

export default function useButton(props, emit, nm): UseButtonReturn {
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
  const loading = computed(() => props.loading)

  const handleClick = (event: MouseEvent) => {
    if (mergeDisabled.value || mergeReadonly.value) {
      event.preventDefault()
      return
    }
    emit('click', event)
  }

  return { htmlType, buttonClasses, loading, handleClick }
}
