import { useSlots } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { useProps } from './context'
import { type UseDividerReturn } from './type'

/**
 * Divider 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @returns {UseDividerReturn} 返回是否有默认插槽
 */
export default function useDivider(
  props: ExtractPropTypes<typeof useProps>
): UseDividerReturn {
  const hasDefaultSlot = () => useSlots().default !== undefined

  return {
    hasDefaultSlot
  }
}
