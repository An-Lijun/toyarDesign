import { installComp } from '../../utils'
import TyRate from './src/rate.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useRate } from './src/use-rate'
import type { TyRateInstance, UseRateReturn } from './src/type'

export const useTyRate = {
  useProps,
  nm,
  useEmits,
  useRate,
  staticProps
}

export type { TyRateInstance, UseRateReturn }

export default installComp(TyRate)
