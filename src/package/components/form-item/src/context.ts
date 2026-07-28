import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'form-item',
  props: {
    /** 字段名称 */
    prop: String,
    /** 是否禁用 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 是否只读 */
    readonly: {
      type: Boolean,
      default: false
    },
    /** 标签文本 */
    label: {
      type: String,
      default: ''
    },
    /** 是否显示必填星号 */
    isShowStar: {
      type: Boolean,
      default: true
    }
  },
  emits: {}
})
