import TyLoading from './loading.vue'
import { type ComputedRef } from 'vue'

export type TyLoadingInstance = InstanceType<typeof TyLoading>

export interface UseLoadingReturn {
  loadingClass: ComputedRef<any[]>
}
