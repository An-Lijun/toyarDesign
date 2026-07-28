import { installComp } from '../../utils'
import TyInputPassword from './src/input-password.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useInputPassword } from './src/use-input-password'
import type { TyInputPasswordInstance, UseInputPasswordReturn } from './src/type'

export const useTyInputPassword = {
  useProps,
  nm,
  useEmits,
  useInputPassword,
  staticProps
}

export type { TyInputPasswordInstance, UseInputPasswordReturn }

export default installComp(TyInputPassword)
