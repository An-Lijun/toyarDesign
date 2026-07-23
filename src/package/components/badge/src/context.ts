import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'badge',
  props: {
    /** 坏章内容 */
    text: {
      type: [String, Number],
      default: ''
    },
    /** 最大显示数量 */
    max: {
      type: Number,
      default: 99
    },
    /** 是否为点 */
    dot: {
      type: Boolean,
      default: false
    },
    /** 状态 */
    status: {
      type: String,
      default: 'danger'
    }
  },
  emits: {
  }
})
