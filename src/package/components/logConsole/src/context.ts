import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'logConsole',
  props: {
    /** 最大日志数量 */
    maxSize: {
      type: [Number, String],
      default: 10000
    },
    /** 单条日志高度 */
    itemHieght: {
      type: [Number, String],
      default: 40
    },
    /** 组件高度 */
    height: {
      type: [Number, String],
      default: 400
    },
    /** 是否显示清除按钮 */
    isClear: {
      type: Boolean,
      default: true
    },
    /** 前缀配置 */
    prefixDist: {
      type: Object
    },
    /** 新日志添加模式 */
    addModel: {
      type: String,
      default: 'append'
    }
  },
  emits: {}
})
