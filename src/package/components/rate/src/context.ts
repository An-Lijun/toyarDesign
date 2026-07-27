import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'rate',
  props: {
    /** 绑定值 */
    modelValue: {
      type: String,
      default: 0
    },
    /** 最大评分 */
    max: {
      type: Number,
      default: 5
    },
    /** 是否允许半星 */
    allowHalf: {
      type: Boolean,
      default: false
    }
  },
  emits: {
    /** 更新绑定值 */
    'update:modelValue': (value: string | number) => true
  }
})
