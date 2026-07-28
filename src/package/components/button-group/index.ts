import { installComp } from '../../utils'
import TyButtonGroup from './src/button-group.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useButtonGroup } from './src/use-button-group'
import type { TyButtonGroupInstance, UseButtonGroupReturn } from './src/type'

export const useTyButtonGroup = {
  useProps,
  nm,
  useEmits,
  useButtonGroup,
  staticProps
}

export type { TyButtonGroupInstance, UseButtonGroupReturn }

export default installComp(TyButtonGroup)
