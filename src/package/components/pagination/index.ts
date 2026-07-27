import { installComp } from '../../utils'
import TyPagination from './src/pagination.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as usePagination } from './src/use-pagination'
import type { TyPaginationInstance, UsePaginationReturn } from './src/type'

export const useTyPagination = {
  useProps,
  nm,
  useEmits,
  usePagination,
  staticProps
}

export type { TyPaginationInstance, UsePaginationReturn }

export default installComp(TyPagination)
