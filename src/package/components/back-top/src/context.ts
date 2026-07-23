import { createComponentContext } from '@/package/utils/createComponentContext'

export interface BackTopEmits {
  'click': () => boolean
}
export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'backTop',
  props: {
    /** 触发距离 */
    vHeight: {
      type: Number,
      default: 200,
    },
    /** 右侧距离 */
    right: {
      type: Number,
      default: 40,
    },
    /** 底部距离 */
    bottom: {
      type: Number,
      default: 40,
    },
    /** 目标元素 */
    target: {
      type: String,
      default: '',
    },
    /** 是否显示圆角 */
    circle: {
      type: Boolean,
      default: false,
    }
  },
  emits: {
    /** 点击事件 */
    'click': () => true
  }
})
