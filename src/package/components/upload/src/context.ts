import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'upload',
  props: {
    /** 是否禁用上传 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 是否为拖拽卡片模式 */
    dragger: {
      type: Boolean,
      default: false
    },
    /** 是否支持拖拽上传 */
    drag: {
      type: Boolean,
      default: false
    },
    /** 接受的文件类型 */
    accept: {
      type: String,
      default: ''
    }
  },
  emits: {
    change: (file: any) => true
  }
})
