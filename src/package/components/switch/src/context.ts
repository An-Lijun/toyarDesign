import { createComponentContext } from '@/package/utils/createComponentContext'
import { TY_SIZE } from '@/package/constant'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'switch',
  props: {
    size: {
      type: String,
      default: 'small',
      values: TY_SIZE
    },
    uncheckedText: {
      type: String,
      default: ''
    },
    checkedText: {
      type: String,
      default: ''
    },
    openValue: {
      type: [String, Boolean],
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    closeValue: {
      type: [String, Boolean],
      default: false
    },
    type: {
      type: String,
      default: 'round',
      values: ['round', 'tube', 'inline']
    }
  },
  emits: {
    'update:modelValue': (value: any) => true,
    change: (value: any) => true
  }
})
