import { installComp } from '../../utils'
import TyEmpty from './src/empty.vue'
import { useProps, nm, staticProps } from './src/context'
import { default as useEmpty } from './src/use-empty'
import type { TyEmptyInstance, UseEmptyReturn } from './src/type'

export const useTyEmpty = {
  useProps,
  nm,
  useEmpty,
  staticProps
}

export type { TyEmptyInstance, UseEmptyReturn }

export default installComp(TyEmpty)
