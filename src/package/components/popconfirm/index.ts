import { installComp } from '../../utils'
import TyPopconfirm from './src/popconfirm.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as usePopconfirm } from './src/use-popconfirm'
import type { TyPopconfirmInstance, UsePopconfirmReturn } from './src/type'

export const useTyPopconfirm = {
  useProps,
  nm,
  useEmits,
  usePopconfirm,
  staticProps
}

export type { TyPopconfirmInstance, UsePopconfirmReturn }

export default installComp(TyPopconfirm)
