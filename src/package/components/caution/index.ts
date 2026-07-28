import { installComp } from '../../utils'
import TyCaution from './src/caution.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useCaution } from './src/use-caution'
import type { TyCautionInstance, UseCautionReturn } from './src/type'

export const useTyCaution = {
  useProps,
  nm,
  useEmits,
  useCaution,
  staticProps
}

export type { TyCautionInstance, UseCautionReturn }

export default installComp(TyCaution)
