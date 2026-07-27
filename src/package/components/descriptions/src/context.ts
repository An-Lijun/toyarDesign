import { createComponentContext } from '@/package/utils/createComponentContext'
import { TY_SIZE } from '../../../constant'

export const { staticProps, useProps, nm } = createComponentContext({
  name: 'descriptions',
  props: {
    /** 标题 */
    title: { type: String, default: '' },
    /** 描述数据 */
    data: { type: Array },
    /** 列数 */
    column: { type: Number, default: 3 },
    /** 尺寸 */
    size: { type: String, default: 'small', values: TY_SIZE },
    /** 对齐方式 */
    align: { type: String, default: 'left', values: ['left', 'center', 'right'] },
    /** 布局方式 */
    layout: {
      type: String,
      default: 'column',
      validator: (value: string) => {
        return ['column', 'row'].includes(value)
      }
    },
    /** 是否显示边框 */
    border: { type: Boolean, default: false }
  }
})
