import { installComp } from '../../utils'
import TyTransfer from './src/transfer.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useTransfer } from './src/use-transfer'
import type { TyTransferInstance, UseTransferReturn, TransferItem } from './src/type'

export const useTyTransfer = {
  useProps,
  nm,
  useEmits,
  useTransfer,
  staticProps
}

export type { TyTransferInstance, UseTransferReturn, TransferItem }

export default installComp(TyTransfer)
