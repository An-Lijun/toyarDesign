import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'dialog',
  props: {
    /** 对话框标题 */
    title: {
      type: String,
      default: '提示'
    },
    /** 对话框宽度 支持百分比和calc计算宽度*/
    width: {
      type: String,
      default: '30%'
    },
    /** 对话框距顶部距离 */
    top: {
      type: String,
      default: '15vh'
    },
    /** 提示信息 */
    content: {
      type: String
    },
    /** 是否显示下划线 */
    isUnderLine: {
      type: Boolean,
      default: true
    },
    /** 是否使用 teleport 传送 */
    isTeleport: {
      type: Boolean,
      default: true
    },
    /** 是否可拖拽 */
    draggable: {
      type: Boolean,
      default: true
    },
    /** 是否显示遮罩层 */
    mask: {
      type: Boolean,
      default: true
    },
    /** 是否允许点击遮罩层关闭对话框 */
    maskClosable: {
      type: Boolean,
      default: false
    },
    /** 弹窗打开时是否锁定 body 滚动 */
    isScrollLock: {
      type: Boolean,
      default: true
    },
    /** 关闭时是否销毁弹窗内容 */
    destroyOnClose: {
      type: Boolean,
      default: true
    },
    /** 是否允许按 ESC 键关闭对话框 */
    closeOnEsc: {
      type: Boolean,
      default: false
    },
    /** 是否展示关闭按钮 */
    isShowClose: {
      type: Boolean,
      default: true
    },
    /** 是否开启全屏 */
    fullscreen: {
      type: Boolean,
      default: false
    },
    /** 关闭前的回调，调用 done 才会真正关闭 Dialog */
    beforeClose: {
      type: Function,
      default: (done: () => void) => {
        done()
      }
    }
  },
  emits: {
    'update:modelValue': (_value: boolean) => true
  }
})
