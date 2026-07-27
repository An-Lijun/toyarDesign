import { installComp } from '../../utils'
import TyProgress from './src/progress.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useProgress } from './src/use-progress'
import type { TyProgressInstance, UseProgressReturn } from './src/type'

export const useTyProgress = {
  useProps,
  nm,
  useEmits,
  useProgress,
  staticProps
}

export type { TyProgressInstance, UseProgressReturn }

export default installComp(TyProgress)
