import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'poppover',
  props: {
    /** 弹出位置 */
    placement: {
      type: String,
      default: 'top'
    },
    /** 弹出内容 */
    content: {
      type: String,
      default: ''
    },
    /** 触发方式 */
    trigger: {
      type: String,
      default: 'hover'
    }
  },
  emits: {}
})
