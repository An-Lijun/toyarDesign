import { installComp } from '../../utils'
import TyPoppover from './src/poppover.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as usePoppover } from './src/use-poppover'
import type { TyPoppoverInstance, UsePoppoverReturn } from './src/type'

export const useTyPoppover = {
  useProps,
  nm,
  useEmits,
  usePoppover,
  staticProps
}

export type { TyPoppoverInstance, UsePoppoverReturn }

export default installComp(TyPoppover)
