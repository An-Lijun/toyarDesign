import TyDialog from './dialog.vue'
import type { Ref } from 'vue'

export type TyDialogInstance = InstanceType<typeof TyDialog>

export interface UseDialogReturn {
  showValue: Ref<boolean>
  tyDialogHeader: Ref<HTMLElement | null>
  tyDialog: Ref<HTMLElement | null>
  model: Ref<boolean>
  handleClose: () => void
  handleMaskClick: () => void
  initDrag: () => void
}
