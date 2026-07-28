import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'popconfirm',
  props: {
    placement: {
      type: String,
      default: 'top'
    },
    content: {
      type: String,
      default: ''
    },
    rejectText: {
      type: String,
      default: '取消'
    },
    showRejectBtn: {
      type: Boolean,
      default: true
    },
    resloveText: {
      type: String,
      default: '确定'
    },
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
