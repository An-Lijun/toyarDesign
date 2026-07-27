import TyRow from './row.vue'
import { type ComputedRef } from 'vue'

export type TyRowInstance = InstanceType<typeof TyRow>

export interface UseRowReturn {
  compJustify: ComputedRef<string | undefined>
  compAlign: ComputedRef<string | undefined>
}
