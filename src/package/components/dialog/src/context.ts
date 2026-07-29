import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'dialog',
  props: {
    /** 对话框标题 */
    title: {
      type: String,
      default: '提示'
    },
    /** 对话框宽度 */
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
    info: {
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
    }
  },
  emits: {
    'update:modelValue': (value: boolean) => true
  }
})
