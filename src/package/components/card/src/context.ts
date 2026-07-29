import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'card',
  props: {
    /** 是否显示边框 */
    border: {
      type: Boolean,
      default: true
    },
    /** 卡片阴影样式 */
    shadow: {
      type: String,
      default: 'none'
    },
    /** 是否显示加载状态 */
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: {
  }
})