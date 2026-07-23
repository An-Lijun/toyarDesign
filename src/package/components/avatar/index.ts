import { installComp } from '../../utils'
import TyAvatar from './src/avatar.vue'
import { useProps, nm, useEmits , staticProps } from './src/context'
import { default as useAvatar } from './src/use-avatar'

export const useTyAvatar = {
  useProps,
  nm,
  useEmits,
  useAvatar,
  staticProps
}

installComp(TyAvatar)
export default TyAvatar