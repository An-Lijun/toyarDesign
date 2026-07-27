import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'pageHeader',
  props: {
    /** 标题 */
    title: {
      type: String,
      default: ''
    },
    /** 副标题 */
    subTitle: {
      type: String,
      default: ''
    },
    /** 是否显示返回按钮 */
    showBack: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    /** 返回事件 */
    back: () => true
  }
})
