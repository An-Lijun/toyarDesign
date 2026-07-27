import TyTransfer from './transfer.vue'
import { type Ref, type ComputedRef } from 'vue'

export type TyTransferInstance = InstanceType<typeof TyTransfer>

export interface TransferItem {
  value: string | number
  label: string
}

export interface UseTransferReturn {
  data: Ref<TransferItem[]>
  leftCheck: Ref<(string | number)[]>
  rightCheck: Ref<(string | number)[]>
  leftDisabled: Ref<boolean>
  rightDiabeld: Ref<boolean>
  leftAllCheck: Ref<(string | number)[]>
  rightAllCheck: Ref<(string | number)[]>
  leftHarf: ComputedRef<boolean>
  rightHarf: ComputedRef<boolean>
  handleToRight: () => void
  handleToLeft: () => void
  handleLfChange: (val: (string | number)[]) => void
  handleRtChange: (val: (string | number)[]) => void
  handleLfAllChange: (val: (string | number)[]) => void
  handleRtAllChange: (val: (string | number)[]) => void
}
