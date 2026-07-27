import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'slider',
  props: {
    /** 绑定值 */
    modelValue: { type: [String, Number], required: true, default: '' },
    /** 最小值 */
    min: { type: [String, Number], default: 0 },
    /** 最大值 */
    max: { type: [String, Number], default: 100 },
    /** 滑块宽度 */
    width: { type: [String, Number], default: 10 }
  },
  emits: {
    /** 更新绑定值 */
    'update:modelValue': (value: string | number) => true
  }
})
