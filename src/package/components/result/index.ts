import { installComp } from '../../utils'
import TyResult from './src/result.vue'
import { useProps, nm, staticProps } from './src/context'
import { default as useResult } from './src/use-result'
import type { TyResultInstance, UseResultReturn } from './src/type'

export const useTyResult = {
  useProps,
  nm,
  useResult,
  staticProps
}

export type { TyResultInstance, UseResultReturn }

export default installComp(TyResult)
