import { createComponentContext } from '@/package/utils/createComponentContext'

export interface AffixEmits {
  'fixed-change': (value: boolean) => boolean
}


export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'affix',
  props: {
    /** 自定义标签 */
    tag: { type: String, default: 'div' },
    /** 顶部偏移量 */
    offsetTop: { type: Number, default: 0 },
    /** 底部偏移量 */
    offsetBottom: { type: Number },
    /** 目标元素 */
    target: { type: Element },
  },
  emits: {
    /** 固定状态改变时触发 */
    'fixed-change': (value: boolean) => true,
  }
})
