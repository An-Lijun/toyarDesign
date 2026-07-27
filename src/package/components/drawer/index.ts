import { installComp } from '../../utils'
import TyDrawer from './src/drawer.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useDrawer } from './src/use-drawer'
import type { TyDrawerInstance, UseDrawerReturn } from './src/type'

export const useTyDrawer = {
  useProps,
  nm,
  useEmits,
  useDrawer,
  staticProps
}

export type { TyDrawerInstance, UseDrawerReturn }

export default installComp(TyDrawer)
