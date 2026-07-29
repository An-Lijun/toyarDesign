import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"
import { TY_SIZE } from "../../../constant"

export const radioGroupProps =buildProps({
  /** 单选组尺寸 */
  size: {
    type: String,
    values:TY_SIZE
  },
  /** 当前选中值（v-model绑定） */
  modelValue: {
    required: true,
    type: [String, Number],
    default: ''
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否只读 */
  readonly: {
    type: Boolean,
    default: false
  }
})
export const radioGroupEmits =['update:modelValue','change']

export const radioProps =buildProps({
  /** 单选按钮尺寸 */
  size: {
    type: String,
    values:TY_SIZE
  },
  /** 当前选中值（v-model绑定） */
  modelValue: {
    type: [String, Number],
    default: ''
  },
  /** 单选按钮值 */
  value: {
    type: [String,Number],
    required: true
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否只读 */
  readonly: {
    type: Boolean,
    default: false
  }
})

export const radioEmits =['update:modelValue','change']

export const nm =useNmSpace('radio')