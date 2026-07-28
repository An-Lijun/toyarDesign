import { installComp } from '../../utils'
import TyInput from './src/input.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useInput } from './src/use-input'
import type { TyInputInstance, UseInputReturn } from './src/type'

export const useTyInput = {
  useProps,
  nm,
  useEmits,
  useInput,
  staticProps
}

export type { TyInputInstance, UseInputReturn }

export default installComp(TyInput)
