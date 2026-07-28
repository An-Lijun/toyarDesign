import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'form',
  props: {
    /** 表单数据 */
    formData: Object,
    /** 验证规则 */
    rules: {
      type: Object,
      default: () => ({})
    },
    /** 标签宽度 */
    labelWidth: {
      type: String,
      default: '100'
    },
    /** 标签后缀 */
    labelSuffix: {
      type: String,
      default: ':'
    },
    /** 标签位置 */
    labelPosition: String,
    /** 表单尺寸 */
    size: String,
    /** 是否禁用 */
    disabled: Boolean,
    /** 是否只读 */
    readonly: Boolean,
    /** 布局方式 */
    layout: {
      type: String,
      default: 'inline',
      values: ['vertical', 'inline']
    }
  },
  emits: {}
})

export type FormProps = typeof staticProps
