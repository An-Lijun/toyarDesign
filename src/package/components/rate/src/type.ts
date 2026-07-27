import TyRate from './rate.vue'
import { type Ref, type Component } from 'vue'

export type TyRateInstance = InstanceType<typeof TyRate>

export interface UseRateReturn {
  model: Ref<string | number>
  icon: Ref<Component[]>
  actived: Ref<number>
  handleEnter: (e: MouseEvent) => void
  handleLeave: (e: MouseEvent) => void
  handleClick: (e: MouseEvent) => void
}
