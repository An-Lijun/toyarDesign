import { createComponentContext } from '@/package/utils/createComponentContext'
import { TY_SIZE } from '@/package/constant'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'input',
  props: {
    /** 输入框尺寸 */
    size: {
      type: String,
      values: TY_SIZE
    },
    /** 是否可清除 */
    clearable: {
      type: Boolean,
      default: true
    },
    /** 是否禁用 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 是否只读 */
    readonly: {
      type: Boolean,
      default: false
    },
    /** 绑定值 */
    modelValue: {
      type: [String, Number],
      default: ''
    },
    /** 是否显示字数限制 */
    showLimit: {
      type: Boolean,
      default: false
    },
    /** 格式化函数 */
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
