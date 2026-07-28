import { computed } from 'vue'
import { nm } from './context'
import type { UseLoadingReturn } from './type'

export default function useLoading(
  props: Record<string, any>
): UseLoadingReturn {
  const loadingClass = computed(() => [
    nm.b(),
    nm.is('fixed', props.isFixed)
  ])

  return {
    loadingClass
  }
}
