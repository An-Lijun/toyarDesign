import { createComponentContext } from '@/package/utils/createComponentContext'

export interface AffixEmits {
  'fixed-change': (value: boolean) => boolean
}


export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'affix',
  props: {
    tag: { type: String, default: 'div', description: '自定义标签' },
    offsetTop: { type: Number, default: 0, description: '顶部偏移量' },
    offsetBottom: { type: Number, description: '底部偏移量' },
    target: { type: Element, description: '目标元素' },
  },
  emits: {
    'fixed-change': (value: boolean) => true,
    description: '固定状态改变时触发',
  }
})


