import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'loading',
  props: {
    /** 是否固定定位 */
    isFixed: {
      type: Boolean,
      default: false
    }
  },
  emits: {}
})
