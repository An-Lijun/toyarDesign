import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'progress',
  props: {
    /** 绑定值 */
    modelValue: {
      type: [String, Number],
      required: true,
      default: ''
    },
    /** 进度条宽度 */
    strokeWidth: {
      type: [String, Number],
      default: 5
    },
    /** 是否显示百分比 */
    isShowPer: {
      type: Boolean,
      default: false
    },
    /** 类型 */
    type: {
      type: String,
      default: 'line'
    },
    /** 圆形进度条宽度 */
    width: {
      type: [String, Number],
      default: 50
    }
  },
  emits: {
    /** 更新绑定值 */
    'update:modelValue': (value: string | number) => true
  }
})
