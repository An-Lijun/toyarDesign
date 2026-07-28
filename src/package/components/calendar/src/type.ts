import TyCalendar from './calendar.vue'
import { type Ref } from 'vue'

export type TyCalendarInstance = InstanceType<typeof TyCalendar>

export interface UseCalendarReturn {
  nowDate: Ref<string>
  nowMonthStr: Ref<string>
  befMonth: Ref<Array<number>>
  nowMonth: Ref<number>
  aftMonth: Ref<number>
  weekArr: string[]
  nowDateStr: string
  padZero: (num: number) => string
  lastYear: () => void
  lastMonth: () => void
  nextMonth: () => void
  nextYear: () => void
  goTday: () => void
  selectDay: (dayItem: number) => void
  getNowDate: () => string
}
