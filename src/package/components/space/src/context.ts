import { createComponentContext } from '@/package/utils/createComponentContext'
import { TY_SIZE } from '../../../constant'

export const { staticProps, useProps, nm } = createComponentContext({
  name: 'space',
  props: {
    /** 对齐方式 */
    align: {
      type: String,
      validator: (value: string) => ['start', 'end', 'center', 'baseline'].includes(value),
      default: 'center'
    },
    /** 水平排列方式 */
    justify: {
      type: String,
      validator: (value: string) => ['start', 'end', 'center', 'between', 'around', 'evenly'].includes(value),
      default: 'start'
    },
    /** 排列方向 */
    direction: {
      type: String,
      validator: (value: string) => ['row', 'column'].includes(value),
      default: 'row'
    },
    /** 间距大小 */
    size: {
      type: [Number, String],
      validator: (value: string | number) => TY_SIZE.includes(String(value)),
      default: 'small'
    }
  }
})
