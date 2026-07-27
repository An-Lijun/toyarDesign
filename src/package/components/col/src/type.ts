import TyCol from './col.vue'
import { type Ref, type ComputedRef } from 'vue'

export type TyColInstance = InstanceType<typeof TyCol>

export interface UseColReturn {
  gutter: Ref<number> | { value: number }
  compStyle: ComputedRef<string>
}
