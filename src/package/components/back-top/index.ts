import { installComp } from '../../utils'
import TyBackTop from './src/back-top.vue'
import { useProps , nm, useEmits , staticProps  } from './src/context'
import { default as useBackTop } from './src/use-back-top'

export const useTyBackTop = {
  useProps,
  nm,
  useEmits,
  useBackTop,
  staticProps
}


export default installComp(TyBackTop)