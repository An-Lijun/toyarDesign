import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'smsCodeInput',
  props: {
    /** 绑定值 */
    modelValue: { type: String },
    /** 验证码长度 */
    length: { type: Number, default: 6 },
    /** 是否禁用 */
    disabled: { type: Boolean, default: false },
    /** 是否只读 */
    readonly: { type: Boolean, default: false },
    /** 允许输入的字符 */
    regCodes: { type: Array, default: () => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] },
    /** 输入框间距 */
    gap: { type: Number, default: 12 }
  },
  emits: {
    /** 输入成功 */
    success: () => true,
    /** 更新绑定值 */
    'update:modelValue': (value: string) => true
  }
})
