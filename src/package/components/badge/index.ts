import { installComp } from '../../utils'
import TyBadge from './src/badge.vue'
import { useProps, nm, useEmits , staticProps  } from './src/context'
import { default as useBadge } from './src/use-badge'

export const useTyBadge = {
  useProps,
  nm,
  useEmits,
  useBadge,
  staticProps
}

export default installComp(TyBadge)