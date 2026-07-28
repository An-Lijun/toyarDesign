import { installComp } from '../../utils'
import TyDatePicker from './src/datePicker.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useDatePicker } from './src/use-date-picker'
import type { TyDatePickerInstance, UseDatePickerReturn } from './src/type'

export const useTyDatePicker = {
  useProps,
  nm,
  useEmits,
  useDatePicker,
  staticProps
}

export type { TyDatePickerInstance, UseDatePickerReturn }

export default installComp(TyDatePicker)
