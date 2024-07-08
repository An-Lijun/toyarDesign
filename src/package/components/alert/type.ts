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
export type strObj = { [key: string]: string }