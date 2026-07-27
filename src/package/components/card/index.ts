import {installComp} from '../../utils'
import TyCard from './src/card.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
export const useTyCard = {
  useProps,
  nm,
  useEmits,
  staticProps
}
export default installComp(TyCard) 