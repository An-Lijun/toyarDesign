import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm } = createComponentContext({
  name: 'divider',
  props: {
    /** 分割线方向 */
    direction: { type: String, default: 'row', values: ['row', 'column'] },
    /** 分割线位置 */
    position: { type: String, default: 'center', values: ['center', 'left', 'right', 'bottom', 'top'] }
  }
})
