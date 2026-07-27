import { installComp } from '../../utils'
import TyPageHeader from './src/pageHeader.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as usePageHeader } from './src/use-pageHeader'
import type { TyPageHeaderInstance, UsePageHeaderReturn } from './src/type'

export const useTyPageHeader = {
  useProps,
  nm,
  useEmits,
  usePageHeader,
  staticProps
}

export type { TyPageHeaderInstance, UsePageHeaderReturn }

export default installComp(TyPageHeader)
