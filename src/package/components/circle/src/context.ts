import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm } = createComponentContext({
  name: 'circle',
  props: {
    /** 百分比 */
    percent: { type: Number, default: 0 },
    /** 圆的大小 */
    size: { type: Number, default: 120 },
    /** 进度条宽度 */
    strokeWidth: { type: Number, default: 6 },
    /** 进度条颜色 */
    strokeColor: { type: String, default: '#298DFF' },
    /** 进度条端点样式 */
    strokeLinecap: { type: String, values: ['square', 'round'], default: 'round' },
    /** 轨道宽度 */
    trailWidth: { type: Number, default: 5 },
    /** 轨道颜色 */
    trailColor: { type: String, default: '#F7F7F7' }
  }
})
