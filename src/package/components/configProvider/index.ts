import { installComp } from '../../utils'
import TyConfigProvider from './src/configProvider.vue'
import { useProps, nm, staticProps } from './src/context'
import { default as useConfigProvider } from './src/use-configProvider'
import type { TyConfigProviderInstance, UseConfigProviderReturn } from './src/type'

export const useTyConfigProvider = {
  useProps,
  nm,
  useConfigProvider,
  staticProps
}

export type { TyConfigProviderInstance, UseConfigProviderReturn }

export default installComp(TyConfigProvider)
