import type { ExtractPropTypes } from 'vue'
import { useProps } from './context'
import { type UseEmptyReturn } from './type'

/**
 * Empty 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @returns {UseEmptyReturn} 返回空对象（该组件无额外逻辑）
 */
export default function useEmpty(
  props: ExtractPropTypes<typeof useProps>
): UseEmptyReturn {
  return {}
}
