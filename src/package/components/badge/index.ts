import { installComp } from '../../utils'
import TyBadge from './src/badge.vue'
import { badgeProp as props, nm, badgeEmits as emits, staticProps as propsData } from './src/context'
import { default as useBadge } from './src/use-badge'

export const useTyBadge = {
  props,
  nm,
  emits,
  useBadge,
  propsData
}

installComp(TyBadge)
export default TyBadge