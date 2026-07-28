import { installComp } from '../../utils'
import TyCalendar from './src/calendar.vue'
import { useProps, nm, useEmits, staticProps } from './src/context'
import { default as useCalendar } from './src/use-calendar'
import type { TyCalendarInstance, UseCalendarReturn } from './src/type'

export const useTyCalendar = {
  useProps,
  nm,
  useEmits,
  useCalendar,
  staticProps
}

export type { TyCalendarInstance, UseCalendarReturn }

export default installComp(TyCalendar)
