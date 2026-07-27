import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm } = createComponentContext({
  name: 'empty',
  props: {
    /** 空状态文本 */
    title: { type: String, default: '暂无数据' },
    /** 图标尺寸 */
    size: { type: Number, default: 54 }
  }
})
