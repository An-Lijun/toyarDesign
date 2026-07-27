import { installComp } from '../../utils'
import TyDivider from './src/divider.vue'
import { useProps, nm, staticProps } from './src/context'
import { default as useDivider } from './src/use-divider'
import type { TyDividerInstance, UseDividerReturn } from './src/type'

export const useTyDivider = {
  useProps,
  nm,
  useDivider,
  staticProps
}

export type { TyDividerInstance, UseDividerReturn }

export default installComp(TyDivider)
