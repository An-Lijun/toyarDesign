import { installComp } from '../../utils'
import TyFormItem from './src/form-item.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useFormItem } from './src/use-form-item'
import type { TyFormItemInstance, UseFormItemReturn } from './src/type'

export const useTyFormItem = {
  useProps,
  nm,
  useEmits,
  useFormItem,
  staticProps
}

export type { TyFormItemInstance, UseFormItemReturn }

export default installComp(TyFormItem)
