import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'avatar-group',
  props: {
    /** 偏移量 */
    offset: {
      type: Number,
      default: 8
    },
    /** 最大显示数量 */
    max: {
      type: Number,
    }
  },
  emits: {
  }
})
