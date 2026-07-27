import type { UsePageHeaderReturn } from './type'

/**
 * PageHeader 组件的核心逻辑 Hook
 * @param emit - 事件发射器
 * @returns {UsePageHeaderReturn} 返回页面头部相关方法
 */
export default function usePageHeader(
  emit: (e: 'back') => void
): UsePageHeaderReturn {
  const handleBack = () => {
    emit('back')
  }

  return {
    handleBack
  }
}
