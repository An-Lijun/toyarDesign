import { installComp } from '../../utils'
import TyTrigger from './src/trigger.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useTrigger } from './src/use-trigger'
import type { TyTriggerInstance, UseTriggerReturn } from './src/type'

export const useTyTrigger = {
  useProps,
  nm,
  useEmits,
  useTrigger,
  staticProps
}

export type { TyTriggerInstance, UseTriggerReturn }

export default installComp(TyTrigger)
