import {installComp} from '../../utils'
import TyAvatarGroup from './src/avatarGroup.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'

import { default as useAvatarGroup } from './src/use-avatar-group'

export const useTyAffix = {
  useProps,
  nm,
  useEmits,
  useAvatarGroup,
  staticProps
}
export default installComp(TyAvatarGroup) 