import TyPoppover from './poppover.vue'
import { type Ref } from 'vue'

export type TyPoppoverInstance = InstanceType<typeof TyPoppover>

export interface UsePoppoverReturn {
  popRef: Ref<any>
  arrowRef: Ref<any>
  containerRef: Ref<any>
  defaultSlot: Ref<any>
  eventMaps: Ref<Record<string, any>>
  isShowConfirm: Ref<boolean>
}
