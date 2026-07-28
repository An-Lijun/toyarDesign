import { installComp } from '../../utils'
import TyForm from './src/form.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useForm } from './src/use-form'
import type { TyFormInstance, UseFormReturn, FormContentProvide } from './src/type'

export const useTyForm = {
  useProps,
  nm,
  useEmits,
  useForm,
  staticProps
}

export type { TyFormInstance, UseFormReturn, FormContentProvide }

export default installComp(TyForm)
