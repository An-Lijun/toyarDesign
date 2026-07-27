import { createComponentContext } from '@/package/utils/createComponentContext'
import { TY_MOOD_LS } from '../../../constant'

export const { staticProps, useProps, nm } = createComponentContext({
  name: 'result',
  props: {
    /** 结果类型 */
    type: { type: String, required: true, values: TY_MOOD_LS },
    /** 标题 */
    title: { type: String },
    /** 副标题 */
    subTitle: { type: String },
    /** 图标尺寸 */
    size: { type: String, default: '100' }
  }
})
