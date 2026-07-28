import { installComp } from '../../utils'
import TyCard from './src/card.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useCard } from './src/use-card'
import type { TyCardInstance, UseCardReturn } from './src/type'

export const useTyCard = {
  useProps,
  nm,
  useEmits,
  useCard,
  staticProps
}

export type { TyCardInstance, UseCardReturn }

export default installComp(TyCard)
