
// inputProp

import { buildProps } from "@/package/utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"
import { TY_SIZE } from "@/package/constant"

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
    type:Function,
    default:(value:String|Number)=> value
  },
  outPreText:{
    type:String
  },
  outAftText:{
    type:String
  }
})

export const inputEmits =['blur','focus','enter', 'clear','input', 'update:modelValue']

export const nm = useNmSpace('input')