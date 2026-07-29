import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'tooltip',
  props: {
    /** 提示内容 */
    content: {
      type: String,
      default: ''
    },
    /** 弹出位置 */
    placement: {
      type: String,
      default: 'top'
    },
    /** 触发方式 */
    trigger: {
      type: String,
      default: 'hover'
    }
  },
  emits: {}
})
