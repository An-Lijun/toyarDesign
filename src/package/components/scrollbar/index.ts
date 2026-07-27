import { installComp } from '../../utils'
import TyScrollBar from './src/scrollbar.vue'
import { useProps, nm, staticProps } from './src/context'
import { default as useScrollBar } from './src/use-scrollbar'
import type { TyScrollBarInstance, UseScrollBarReturn } from './src/type'

export const useTyScrollBar = {
  useProps,
  nm,
  useScrollBar,
  staticProps
}

export type { TyScrollBarInstance, UseScrollBarReturn }

export { default as TyScrollBar } from './src/scrollbar.vue'
export default installComp(TyScrollBar)
