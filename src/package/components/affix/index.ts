import { installComp } from '../../utils'
import TyAffix from './src/affix.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useAffix } from './src/use-affix'

export const useTyAffix = {
  useProps,
  nm,
  useEmits,
  useAffix,
  staticProps
}

installComp(TyAffix)
export default TyAffix