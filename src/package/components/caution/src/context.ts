import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'caution',
  props: {
    /** 类型 */
    type: {
      type: String,
      default: 'info'
    },
    /** 标题 */
    title: {
      type: String
    },
    /** 是否显示图标 */
    isShowIcon: {
      type: Boolean,
      default: true
    },
    /** 图标尺寸 */
    size: {
      type: [String, Number],
      default: 24
    }
  },
  emits: {}
})
