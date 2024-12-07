import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"
import { TY_SIZE } from "../../../constant"

export const radioGroupProps =buildProps({
  size: {
    type: String,
    values:TY_SIZE
  },
  modelValue: {
    required: true,
    type: [String, Number],
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  }
})
export const radioGroupEmits =['update:modelValue','change']

export const radioProps =buildProps({
  size: {
    type: String,
    values:TY_SIZE
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  value: {
    type: [String,Number],
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  }
})

export const radioEmits =['update:modelValue','change']

export const nm =useNmSpace('radio')