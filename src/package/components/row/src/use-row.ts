import { provide, computed } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { useProps, nm } from './context'
import { rowContent } from '../../../hooks/symbolNm'
import { type UseRowReturn } from './type'

/**
 * Row 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @returns {UseRowReturn} 返回对齐样式计算属性
 */
export default function useRow(
  props: ExtractPropTypes<typeof useProps>
): UseRowReturn {
  provide(rowContent, {
    value: props.gutter
  })

  const compJustify = computed(() => {
    switch (props.justify) {
      case 'start':
        return ''
      case 'center':
        return nm.is('justify-center')
      case 'end':
        return nm.is('justify-end')
      case 'around':
        return nm.is('justify-around')
      case 'between':
        return nm.is('justify-between')
    }
  })

  const compAlign = computed(() => {
    switch (props.align) {
      case 'center':
        return nm.is('align-center')
      case 'end':
        return nm.is('align-bottom')
      case 'top':
        return nm.is('align-top')
    }
  })

  return {
    compJustify,
    compAlign
  }
}
