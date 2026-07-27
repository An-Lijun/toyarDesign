import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm } = createComponentContext({
  name: 'configProvider',
  props: {
    /** 主题模式 */
    theme: { type: String, default: 'light' },
    /** 配置选项 */
    options: { type: Object, default: () => ({}) },
    /** 设计令牌 */
    tokens: { type: Object, default: () => ({}) }
  }
})
