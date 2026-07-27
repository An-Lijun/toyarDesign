import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'image',
  props: {
    /** 图片地址 */
    src: {
      type: String,
      required: true
    },
    /** 图片尺寸 */
    size: {
      type: String,
      default: '100'
    },
    /** 图片形状 */
    shape: {
      type: String,
      default: 'square',
      values: ['square', 'circle']
    },
    /** 图片填充方式 */
    fit: {
      type: String,
      default: 'none',
      values: ['none', 'fill', 'contain', 'cover', 'scale-down']
    },
    /** 替代文本 */
    alt: {
      type: String
    }
  },
  emits: {}
})
