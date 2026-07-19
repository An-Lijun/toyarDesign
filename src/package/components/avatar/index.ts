import { installComp } from '../../utils'
import TyAvatar from './src/avatar.vue'
import { avatarProps as props, nm, avatarEmits as emits, staticProps as propsData } from './src/context'
import { default as useAvatar } from './src/use-avatar'

export const useTyAvatar = {
  props,
  nm,
  emits,
  useAvatar,
  propsData
}

installComp(TyAvatar)
export default TyAvatar