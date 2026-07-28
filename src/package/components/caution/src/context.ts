import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'caution',
  props: {
    type: {
      type: String,
      default: 'info'
    },
    title: {
      type: String
    },
    isShowIcon: {
      type: Boolean,
      default: true
    },
    size: {
      type: [String, Number],
      default: 24
    }
  },
  emits: {}
})
