
// inputProp

import useNmSpace from "../../../../package/hooks/useBem"

export const inputProps = {
  size: {
    type: String,
    validator: (value:string) => {
      return ['mini', 'small', 'medium', 'large'].includes(value)
    }
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
}
export const inputEmits =['blur','focus','enter', 'clear','input', 'update:modelValue']

export const nm = useNmSpace('input')