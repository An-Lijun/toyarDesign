import type { ExtractPropTypes } from 'vue'
import type { Ref } from 'vue'
import { useProps } from './context'
import { type UseDrawerReturn } from './type'

/**
 * Drawer 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @param model - v-model 绑定值
 * @returns {UseDrawerReturn} 返回关闭函数
 */
export default function useDrawer(
  props: ExtractPropTypes<typeof useProps>,
  model: Ref<boolean>
): UseDrawerReturn {
  const close = () => {
    model.value = false
  }

  return {
    close
  }
}
