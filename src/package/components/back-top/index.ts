import { installComp } from '../../utils'
import TyBackTop from './src/back-top.vue'
import { backTopProps as props, nm, backTopEmits as emits, staticProps as propsData } from './src/context'
import { default as useBackTop } from './src/use-back-top'

export const useTyBackTop = {
  props,
  nm,
  emits,
  useBackTop,
  propsData
}

installComp(TyBackTop)
export default TyBackTop