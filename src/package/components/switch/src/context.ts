import { createComponentContext } from '@/package/utils/createComponentContext'
import { TY_SIZE } from '@/package/constant'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'switch',
  props: {
    /** 尺寸 */
    size: {
      type: String,
      default: 'small',
      values: TY_SIZE
    },
    /** 未选中时的文字 */
    uncheckedText: {
      type: String,
      default: ''
    },
    /** 选中时的文字 */
    checkedText: {
      type: String,
      default: ''
    },
    /** 开启时的值 */
    openValue: {
      type: [String, Boolean],
      default: true
    },
    /** 是否禁用 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 关闭时的值 */
    closeValue: {
      type: [String, Boolean],
      default: false
    },
    /** 类型 */
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
