import { computed } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { badgeProp } from './context'
import useNmSpace from '../../../hooks/useBem'
import { type UseBadgeReturn } from './type'

export default function useBadge(
  props: ExtractPropTypes<typeof badgeProp>,
  nm: ReturnType<typeof useNmSpace>
): UseBadgeReturn {
  const text = computed(() => {
    if (props.dot) {
      return ''
    }
    if (!isNaN(props.text as number)) {
      const text = Number(props.text)
      return text > props.max ? props.max + '+' : text
    }
    return props.text
  })

  return {
    text
  }
}