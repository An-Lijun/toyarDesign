import { installComp } from '../../utils'
import TyLogConsole from './src/logConsole.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useLogConsole } from './src/use-logConsole'
import type { TyLogConsoleInstance, UseLogConsoleReturn } from './src/type'

export const useTyLogConsole = {
  useProps,
  nm,
  useEmits,
  useLogConsole,
  staticProps
}

export type { TyLogConsoleInstance, UseLogConsoleReturn }

export default installComp(TyLogConsole)
