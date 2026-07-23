import { createComponentContext } from '@/package/utils/createComponentContext'
import { TY_STATE, TY_SIZE } from '../../../constant';
export interface ButtonEmits {
  click: [event: MouseEvent]
}

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'button',
  props: {
    /** 按钮状态 */
    state: {
      type: String,
      values: TY_STATE,
      default: "primary",
    },
    /** 按钮类型 */
    type: {
      type: String,
      default: "normal",
      values: ["normal", "secondary", 'outline', "dashed", 'text', 'link']
    },
    /** 是否为块级元素 */
    block: {
      type: Boolean,
      default: false
    },
    /** 是否禁用 */
    disabled: {
      type: Boolean,
      default: false
    },
    /** 按钮大小 */
    size: {
      type: String,
      default: "small",
      values: TY_SIZE
    },
    /** html类型 */
    'html-type': {
      type: String,
      default: "button",
      values: ["button", "submit", "reset"]
    },
    /** 按钮形状 */
    shape: {
      type: String,
      default: "square",
      values: ["square", "round", "circle"]
    },
    /** 是否加载中 */
    loading: {
      type: Boolean,
      default: false
    },
    /** 自定义标签 */
    tag: {
      type: String,
      default: 'button',
    },
  },
  emits: {
    /** 点击事件 */
    click: (event: MouseEvent) => true
  }
})






