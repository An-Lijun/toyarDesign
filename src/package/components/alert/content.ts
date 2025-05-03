import type { strObj } from './type'
import { TyiCheckboxCircleFill, TyiCloseCircleFill, TyiInformationFill } from 'toyaricon'

export const dialogIconMap: strObj = {
  info: TyiInformationFill,
  success: TyiCheckboxCircleFill,
  warning: TyiInformationFill,
  error: TyiCloseCircleFill
}
export const defaultDialogOptions = {
  title: '提示',
  type: 'info',
  isUnderLine: false
}