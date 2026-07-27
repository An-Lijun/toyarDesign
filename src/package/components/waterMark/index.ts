import { installComp } from '../../utils'
import TyWaterMark from './src/waterMark.vue'
import { useProps, nm, staticProps } from './src/context'
import { default as useWaterMark } from './src/use-waterMark'
import type { TyWaterMarkInstance, UseWaterMarkReturn } from './src/type'

export const useTyWaterMark = {
  useProps,
  nm,
  useWaterMark,
  staticProps
}

export type { TyWaterMarkInstance, UseWaterMarkReturn }

export default installComp(TyWaterMark)
