import { installComp } from '../../utils'
import TyTooltip from './src/tooltip.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useTooltip } from './src/use-tooltip'
import type { TyTooltipInstance, UseTooltipReturn } from './src/type'

export const useTyTooltip = {
  useProps,
  nm,
  useEmits,
  useTooltip,
  staticProps
}

export type { TyTooltipInstance, UseTooltipReturn }

export default installComp(TyTooltip)
