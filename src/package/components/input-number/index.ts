import { installComp } from '../../utils'
import TyInputNumber from './src/input-number.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useInputNumber } from './src/use-input-number'
import type { TyInputNumberInstance, UseInputNumberReturn } from './src/type'

export const useTyInputNumber = {
  useProps,
  nm,
  useEmits,
  useInputNumber,
  staticProps
}

export type { TyInputNumberInstance, UseInputNumberReturn }

export default installComp(TyInputNumber)
