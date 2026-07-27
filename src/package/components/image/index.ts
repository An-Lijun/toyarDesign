import { installComp } from '../../utils'
import TyImage from './src/image.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useImage } from './src/use-image'
import type { TyImageInstance, UseImageReturn } from './src/type'

export const useTyImage = {
  useProps,
  nm,
  useEmits,
  useImage,
  staticProps
}

export type { TyImageInstance, UseImageReturn }

export default installComp(TyImage)
