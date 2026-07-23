import { installComp } from '../../utils'
import TyButton from './src/button.vue'

export type { TyButtonInstance } from './src/type.ts'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useButton, type UseButtonReturn } from './src/use-button'

export const useTyButton = {
  useProps,
  nm,
  useEmits,
  useButton,
  staticProps
}
export default installComp(TyButton) 
