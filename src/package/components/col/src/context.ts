import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm } = createComponentContext({
  name: 'col',
  props: {
    /** 栅格占据的列数 */
    span: { type: [Number, Object, String], default: 24 },
    /** 栅格左侧偏移的列数 */
    offset: { type: Number, default: 0 }
  }
})
