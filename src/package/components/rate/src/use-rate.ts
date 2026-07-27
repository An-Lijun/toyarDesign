import { ref } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { useProps } from './context'
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import { TyiStarHalfFill, TyiStarHalfLine, TyiStarFill, TyiStarLine } from 'toyaricon'
import { type UseRateReturn } from './type'

/**
 * Rate 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @param emit - 事件发射器
 * @returns {UseRateReturn} 返回评分组件相关状态和方法
 */
export default function useRate(
  props: ExtractPropTypes<typeof useProps>,
  emit: (e: 'update:modelValue', value: string | number) => void
): UseRateReturn {
  const { model } = useCompMvalue(props, emit)

  const initIcon = () => {
    return props.allowHalf
      ? [TyiStarHalfFill, TyiStarHalfLine]
      : [TyiStarFill, TyiStarLine]
  }

  const icon = ref(initIcon())
  const actived = ref(-1)

  const handleEnter = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    actived.value = Number(target.getAttribute('data-star')) + 1
  }

  const handleLeave = () => {
    actived.value = -1
  }

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    emit('update:modelValue', Number(target.getAttribute('data-star')))
  }

  return {
    model,
    icon,
    actived,
    handleEnter,
    handleLeave,
    handleClick
  }
}
