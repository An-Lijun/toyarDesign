import TyLogConsole from './logConsole.vue'
import { type Ref } from 'vue'

export type TyLogConsoleInstance = InstanceType<typeof TyLogConsole>

export interface LogItem {
  type?: string
  custom?: string
  time?: string
  info: string
}

export interface UseLogConsoleReturn {
  contentRef: Ref<HTMLElement | undefined>
  logArr: Ref<LogItem[]>
  log: (data: LogItem) => void
  handlerMouseEnter: () => void
  handlerMouseLeave: () => void
  handlerClear: () => void
  handlerExport: () => void
  itemContent: (item: LogItem) => string
}
