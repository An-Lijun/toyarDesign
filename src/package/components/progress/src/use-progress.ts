import { ref, watch } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { useProps } from './context'
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import { type UseProgressReturn } from './type'

/**
 * Progress 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @param emit - 事件发射器
 * @returns {UseProgressReturn} 返回进度条相关状态
 */
export default function useProgress(
  props: ExtractPropTypes<typeof useProps>,
  emit: (e: 'update:modelValue', value: string | number) => void
): UseProgressReturn {
  const setFn = (value: string | number) => {
    model.value = Math.floor(Number(value))
  }

  const { model } = useCompMvalue(props, emit, {
    watchChange: setFn
  })

  const style = ref<Record<string, string>>({
    width: '',
    height: '',
    borderWidth: '',
    background: ''
  })

  if (props.type === 'circle') {
    watch(
      model,
      () => {
        style.value = {
          width: `${props.width}px`,
          height: `${props.width}px`,
          borderWidth: `${props.strokeWidth}px`,
          background: `conic-gradient(from -90deg at center, var(--primary-6) ${
            3.6 * Number(model.value)
          }deg, var(--primary-6) ${3.6 * Number(model.value)}deg, var(--fill-4) ${
            3.6 * Number(model.value)
          }deg)`
        }
      },
      { immediate: true }
    )
  }

  return {
    model,
    style
  }
}
