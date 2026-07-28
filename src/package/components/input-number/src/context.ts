import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'inputNumber',
  props: {
    modelValue: {
      type: Number,
      default: ''
    },
    precision: {
      type: Number
    },
    stepStrictly: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 1
    },
    maxlength: {
      type: [Number, String, Object]
    }
  },
  emits: {
    blur: () => true,
    clear: () => true,
    change: (value: number) => true,
    focus: () => true,
    'update:modelValue': (value: number) => true
  }
})
