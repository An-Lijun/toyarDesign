import TyDialog from './dialog.vue'
import { type Ref } from 'vue'

export type TyDialogInstance = InstanceType<typeof TyDialog>

export interface UseDialogReturn {
  showValue: Ref<boolean>
  tyDialogHeader: Ref<any>
  tyDialog: Ref<any>
  model: Ref<boolean>
  handleClose: () => void
  initDrag: () => void
}
