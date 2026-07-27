import TyPagination from './pagination.vue'
import { type ComputedRef } from 'vue'

export type TyPaginationInstance = InstanceType<typeof TyPagination>

export interface UsePaginationReturn {
  items: ComputedRef<number[]>
  preClick: () => void
  aftClick: () => void
  itemClick: (item: number) => void
}
