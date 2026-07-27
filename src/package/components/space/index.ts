import { installComp } from '../../utils'
import TySpace from './src/space.vue'
import { useProps, nm, staticProps } from './src/context'
import { default as useSpace } from './src/use-space'
import type { TySpaceInstance, UseSpaceReturn } from './src/type'

export const useTySpace = {
  useProps,
  nm,
  useSpace,
  staticProps
}

export type { TySpaceInstance, UseSpaceReturn }

export default installComp(TySpace)
