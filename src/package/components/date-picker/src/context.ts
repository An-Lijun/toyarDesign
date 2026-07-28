import { createComponentContext } from '@/package/utils/createComponentContext'
import { TY_SIZE } from '@/package/constant'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'datePicker',
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
      type: String,
      default: ''
    },
    format: {
      type: String
    },
    formatValue: {
      type: Function
    },
    opType: {
      type: String,
      default: 'day'
    }
  },
  emits: {
    blur: () => true,
    input: () => true,
    'update:modelValue': (value: string) => true
  }
})
