import { installComp } from '../../utils'
import TyAffix from './src/affix.vue'
import { affixProps as props, nm, affixEmits as emits, staticProps as propsData } from './src/context'
import { default as useAffix } from './src/use-affix'

export const useSelfAffix = {
  props, 
  nm, 
  emits,
  useAffix,
  propsData
}

installComp(TyAffix)
export default TyAffix