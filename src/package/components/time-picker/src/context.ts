import { createComponentContext } from '@/package/utils/createComponentContext'
import { TY_SIZE } from '@/package/constant'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'timePicker',
  props: {
    /** 绑定值 */
    modelValue: {
      type: String
    },
    /** 尺寸 */
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
    /** 时间格式 */
    format: {
      type: String,
      default: ''
    },
    /** 自定义格式化函数 */
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
