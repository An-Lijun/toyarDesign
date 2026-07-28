import { installComp } from '../../utils'
import TyDialog from './src/dialog.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useDialog } from './src/use-dialog'
import type { TyDialogInstance, UseDialogReturn } from './src/type'

export const useTyDialog = {
  useProps,
  nm,
  useEmits,
  useDialog,
  staticProps
}

export type { TyDialogInstance, UseDialogReturn }

export default installComp(TyDialog)
