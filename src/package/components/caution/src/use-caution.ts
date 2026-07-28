import { TyiInformationFill, TyiCheckboxCircleFill, TyiCloseCircleFill } from 'toyaricon'
import type { UseCautionReturn } from './type'

const cauIconObj = {
  info: TyiInformationFill,
  success: TyiCheckboxCircleFill,
  warning: TyiInformationFill,
  error: TyiCloseCircleFill
}

const colorObj = {
  info: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'danger'
}

/**
 * Caution 组件的核心逻辑 Hook
 * @returns {UseCautionReturn} 返回图标和颜色映射
 */
export default function useCaution(): UseCautionReturn {
  return {
    cauIconObj,
    colorObj
  }
}
