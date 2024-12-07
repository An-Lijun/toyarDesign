import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"
import { TY_SIZE } from "../../../constant"

export const inputProps=buildProps({
  size: {
    type: String,
    default: 'small',
    values:TY_SIZE
  },
  clearable: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [ Number,String],
    required: true,
    default: ''
  }
})


export const nm = useNmSpace('password')