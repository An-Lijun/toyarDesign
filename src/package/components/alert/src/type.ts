import type { TyiIconComponent } from 'toyaricon'

export interface IOption {
  title: string
  type: string
  sure?: {
    text: string
    code: Function
  }
  cancel?: {
    text: string
    code: Function
  },
  isUnderLine: boolean,
}
export type IconMap = { [key: string]: TyiIconComponent }