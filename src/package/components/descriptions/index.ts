import { installComp } from '../../utils'
import TyDescriptions from './src/descriptions.vue'
import { useProps, nm, staticProps } from './src/context'
import { default as useDescriptions } from './src/use-descriptions'
import type { TyDescriptionsInstance, UseDescriptionsReturn } from './src/type'

export const useTyDescriptions = {
  useProps,
  nm,
  useDescriptions,
  staticProps
}

export type { TyDescriptionsInstance, UseDescriptionsReturn }

export default installComp(TyDescriptions)
