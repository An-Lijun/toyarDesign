import { createComponentContext } from '@/package/utils/createComponentContext'
import { TY_SIZE } from '@/package/constant'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'timePicker',
  props: {
    modelValue: {
      type: String
    },
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
    format: {
      type: String,
      default: ''
    },
    formatValue: {
      type: Function
    }
  },
  emits: {
    blur: (value: string) => true,
    input: (value: string) => true,
    'update:modelValue': (value: string) => true
  }
})
