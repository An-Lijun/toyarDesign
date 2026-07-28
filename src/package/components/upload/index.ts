import { installComp } from '../../utils'
import TyUpload from './src/upload.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useUpload } from './src/use-upload'
import type { TyUploadInstance, UseUploadReturn } from './src/type'

export const useTyUpload = {
  useProps,
  nm,
  useEmits,
  useUpload,
  staticProps
}

export type { TyUploadInstance, UseUploadReturn }

export default installComp(TyUpload)
