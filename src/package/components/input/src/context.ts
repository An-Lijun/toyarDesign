
// inputProp

import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"
import { TY_SIZE } from "../../../constant"

export const inputProps = buildProps({
  size: {
    type: String,
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
    type: [String, Number],
    required: true,
    default: ''
  },
  showLimit:{
    type:Boolean,
    default:false
  },
  format:{
    type:Function
  },

})

export const inputEmits =['blur','focus','enter', 'clear','input', 'update:modelValue']

export const nm = useNmSpace('input')