import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'poppover',
  props: {
    placement: {
      type: String,
      default: 'top'
    },
    content: {
      type: String,
      default: ''
    },
    trigger: {
      type: String,
      default: 'hover'
    }
  },
  emits: {}
})
