import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'popconfirm',
  props: {
    /** 弹出位置 */
    placement: {
      type: String,
      default: 'top'
    },
    /** 提示内容 */
    content: {
      type: String,
      default: ''
    },
    /** 拒绝按钮文字 */
    rejectText: {
      type: String,
      default: '取消'
    },
    /** 是否显示拒绝按钮 */
    showRejectBtn: {
      type: Boolean,
      default: true
    },
    /** 确认按钮文字 */
    resloveText: {
      type: String,
      default: '确定'
    },
    /** 是否显示确认按钮 */
    showResloveBtn: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    confirm: () => true,
    reject: () => true
  }
})
