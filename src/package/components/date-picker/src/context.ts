import { createComponentContext } from '@/package/utils/createComponentContext'
import { TY_SIZE } from '@/package/constant'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'datePicker',
  props: {
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
    /** 当前值 */
    modelValue: {
      type: String,
      default: ''
    },
    /** 日期格式 */
    format: {
      type: String
    },
    /** 自定义格式化函数 */
    formatValue: {
      type: Function
    },
    /** 操作类型 */
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
