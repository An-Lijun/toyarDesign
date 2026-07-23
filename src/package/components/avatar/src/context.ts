import { createComponentContext } from '@/package/utils/createComponentContext'

export interface AvatarEmits {
  'trigger': () => boolean
}

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'avatar',
  props: {
    /** 头像宽度 */
    width: {
      type: Number
    },
    /** 头像形状 */
    shape: {
      type: String,
      values: ['circle', 'square'],
      default: ''
    },
    /** 是否自动调整大小 */
    autoSize: {
      type: Boolean,
      default: true
    },
  },
  emits: {
    /** 点击事件 */
    'trigger': () => true
  }
})

