import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'colorPicker',
  props: {
    /** 当前颜色值 */
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: {
    change: (value: string) => true,
    'update:modelValue': (value: string) => true
  }
})
