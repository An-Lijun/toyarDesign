import { createComponentContext } from '@/package/utils/createComponentContext'
import { TY_SIZE } from '@/package/constant'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'password',
  props: {
    /** 输入框尺寸 */
    size: {
      type: String,
      default: 'small',
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
