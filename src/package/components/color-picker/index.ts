import { installComp } from '../../utils'
import TyColorPicker from './src/colorPicker.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useColorPicker } from './src/use-color-picker'
import type { TyColorPickerInstance, UseColorPickerReturn } from './src/type'

export const useTyColorPicker = {
  useProps,
  nm,
  useEmits,
  useColorPicker,
  staticProps
}

export type { TyColorPickerInstance, UseColorPickerReturn }

export default installComp(TyColorPicker)
