import { installComp } from '../../utils'
import TyCircle from './src/circle.vue'
import { useProps, nm, staticProps } from './src/context'
import { default as useCircle } from './src/use-circle'
import type { TyCircleInstance, UseCircleReturn } from './src/type'

export const useTyCircle = {
  useProps,
  nm,
  useCircle,
  staticProps
}

export type { TyCircleInstance, UseCircleReturn }

export default installComp(TyCircle)
