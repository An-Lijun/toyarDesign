import { installComp } from '../../utils'
import TyCol from './src/col.vue'
import { useProps, nm, staticProps } from './src/context'
import { default as useCol } from './src/use-col'
import type { TyColInstance, UseColReturn } from './src/type'

export const useTyCol = {
  useProps,
  nm,
  useCol,
  staticProps
}

export type { TyColInstance, UseColReturn }

export default installComp(TyCol)
