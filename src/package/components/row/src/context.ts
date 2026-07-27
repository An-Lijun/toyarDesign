import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm } = createComponentContext({
  name: 'row',
  props: {
    /** 布局类型 */
    type: { type: String, default: 'line' },
    /** 栅格间隔 */
    gutter: { type: Number, default: 0 },
    /** 水平对齐方式 */
    justify: { type: String, default: 'top' },
    /** 垂直对齐方式 */
    align: { type: String, default: 'center' }
  }
})
