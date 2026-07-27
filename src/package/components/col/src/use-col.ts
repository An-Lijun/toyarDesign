import { computed, inject, ref } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { useProps, nm } from './context'
import { rowContent } from '../../../hooks/symbolNm'
import { type UseColReturn } from './type'

/**
 * Col 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @returns {UseColReturn} 返回 gutter 值和 compStyle 计算属性
 */
export default function useCol(
  props: ExtractPropTypes<typeof useProps>
): UseColReturn {
  const gutter = inject(rowContent, null) as { value: number } | null || ref(0)

  const compStyle = computed(() => {
    if (props.span instanceof Object) {
      let style = ''
      for (const key in (props.span as Object)) {
        style += nm.bem(`${key}-${props.span[key]}`) + ' '
      }
      return style
    }
    return nm.bem(String(props.span))
  })

  return {
    gutter,
    compStyle
  }
}
