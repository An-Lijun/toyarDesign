import { installComp } from '../../utils'
import TySwitch from './src/switch.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useSwitch } from './src/use-switch'
import type { TySwitchInstance, UseSwitchReturn } from './src/type'

export const useTySwitch = {
  useProps,
  nm,
  useEmits,
  useSwitch,
  staticProps
}

export type { TySwitchInstance, UseSwitchReturn }

export default installComp(TySwitch)
