import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'inputNumber',
  props: {
    /** 绑定值 */
    modelValue: {
      type: Number,
      default: ''
    },
    /** 精度 */
    precision: {
      type: Number
    },
    /** 是否严格步进 */
    stepStrictly: {
      type: Boolean,
      default: false
    },
    /** 步长 */
    step: {
      type: Number,
      default: 1
    },
    /** 最大长度 */
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
