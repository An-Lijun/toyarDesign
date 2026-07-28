import { createComponentContext } from '@/package/utils/createComponentContext'
import { TY_SIZE } from '@/package/constant'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'password',
  props: {
    size: {
      type: String,
      default: 'small',
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
      type: [Number, String],
      default: ''
    }
  },
  emits: {
    blur: () => true,
    input: (value: string) => true,
    clear: () => true,
    enter: (value: string) => true,
    'update:modelValue': (value: string) => true
  }
})
