import TyCircle from './circle.vue'
import { type Ref, type ComputedRef } from 'vue'

export type TyCircleInstance = InstanceType<typeof TyCircle>

export interface UseCircleReturn {
  radius: ComputedRef<number>
  pathString: ComputedRef<string>
  colors: Ref<string>
}
