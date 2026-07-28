import { createComponentContext } from '@/package/utils/createComponentContext'
import { TY_SIZE } from '@/package/constant'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'input',
  props: {
    size: {
      type: String,
      values: TY_SIZE
    },
    clearable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    showLimit: {
      type: Boolean,
      default: false
    },
    format: {
      type: Function
    }
  },
  emits: {
    blur: () => true,
    focus: () => true,
    enter: (value: string) => true,
    clear: () => true,
    input: (value: string) => true,
    'update:modelValue': (value: string) => true
  }
})
