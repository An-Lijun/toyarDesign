import TyTooltip from './tooltip.vue'
import { type Ref } from 'vue'

export type TyTooltipInstance = InstanceType<typeof TyTooltip>

export interface UseTooltipReturn {
  eventMaps: Ref<Record<string, any>>
  isShowTip: Ref<boolean>
  popRef: Ref<any>
  arrowRef: Ref<any>
  containerRef: Ref<any>
}
