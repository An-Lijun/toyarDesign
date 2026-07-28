import { installComp } from '../../utils'
import TyTimePicker from './src/timePicker.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useTimePicker } from './src/use-time-picker'
import type { TyTimePickerInstance, UseTimePickerReturn } from './src/type'

export const useTyTimePicker = {
  useProps,
  nm,
  useEmits,
  useTimePicker,
  staticProps
}

export type { TyTimePickerInstance, UseTimePickerReturn }

export default installComp(TyTimePicker)
