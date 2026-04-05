import { installComp } from '../../utils'
import TyButton from './src/button.vue'

export type { TyButtonInstance } from './src/type.ts'
import { buttonProps as props, nm, buttonEmits as emits,staticProps as propsData} from './src/context'
import { default as useButton, type UseButtonReturn } from './src/use-button'

export const useTyButton = {
  props, 
  nm, 
  emits,
  useButton,
  propsData
}
export default installComp(TyButton) 
