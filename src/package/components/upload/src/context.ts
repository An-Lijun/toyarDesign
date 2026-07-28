import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'upload',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    dragger: {
      type: Boolean,
      default: false
    },
    drag: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: ''
    }
  },
  emits: {
    change: (file: any) => true
  }
})
