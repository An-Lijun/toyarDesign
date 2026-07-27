import type { ExtractPropTypes } from 'vue'
import { useProps } from './context'
import { TyiInformationFill, TyiCheckboxCircleFill, TyiCloseCircleFill } from 'toyaricon'
import { type UseResultReturn } from './type'

/**
 * Result 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @returns {UseResultReturn} 返回图标和颜色映射对象
 */
export default function useResult(
  props: ExtractPropTypes<typeof useProps>
): UseResultReturn {
  const msgIconObj = {
    info: TyiInformationFill,
    success: TyiCheckboxCircleFill,
    warning: TyiInformationFill,
    error: TyiCloseCircleFill
  }

  const colorObj = {
    'info': 'primary',
    'success': 'success',
    'warning': 'warning',
    'error': 'danger'
  }

  return {
    msgIconObj,
    colorObj
  }
}
