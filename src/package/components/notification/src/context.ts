import { createComponentContext } from '@/package/utils/createComponentContext'
import { TY_MOOD_LS } from '../../../constant'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'notification',
  props: {
    /** 通知类型 */
    type: {
      type: String,
      values: TY_MOOD_LS
    },
    /** 标题 */
    title: {
      type: String,
      required: true
    },
    /** 消息内容 */
    message: {
      type: String
    },
    /** 顶部距离 */
    top: {
      type: String
    },
    /** 显示时长 */
    time: {
      type: String
    }
  },
  emits: {
    /** 关闭事件 */
    close: () => true
  }
})
