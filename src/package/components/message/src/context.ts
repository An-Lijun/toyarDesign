import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'message',
  props: {
    /** 消息内容 */
    msg: {
      type: String,
      required: true
    },
    /** 配置选项 */
    options: {
      type: Object
    },
    /** 顶部距离 */
    top: {
      type: String,
      default: '0'
    }
  },
  emits: {
    /** 关闭事件 */
    close: () => true
  }
})
