import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'loading',
  props: {
    isFixed: {
      type: Boolean,
      default: false
    }
  },
  emits: {}
})
