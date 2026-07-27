import { installComp } from '../../utils'
import TyRow from './src/row.vue'
import { useProps, nm, staticProps } from './src/context'
import { default as useRow } from './src/use-row'
import type { TyRowInstance, UseRowReturn } from './src/type'

export const useTyRow = {
  useProps,
  nm,
  useRow,
  staticProps
}

export type { TyRowInstance, UseRowReturn }

export default installComp(TyRow)
