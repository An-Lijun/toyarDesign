import { installComp } from '../../utils'
import TySlider from './src/slider.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useSlider } from './src/use-slider'
import type { TySliderInstance, UseSliderReturn } from './src/type'

export const useTySlider = {
  useProps,
  nm,
  useEmits,
  useSlider,
  staticProps
}

export type { TySliderInstance, UseSliderReturn }

export default installComp(TySlider)
