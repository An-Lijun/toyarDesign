import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'dialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    width: {
      type: String,
      default: '30%'
    },
    top: {
      type: String,
      default: '15vh'
    },
    info: {
      type: String
    },
    isUnderLine: {
      type: Boolean,
      default: true
    },
    isTeleport: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    'update:modelValue': (value: boolean) => true
  }
})
