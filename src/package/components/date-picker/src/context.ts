import { TY_SIZE } from '../../../constant'
import useNmSpace from '../../../hooks/useBem'
import buildProps from '../../../utils/buildProps'

export const datePickerProp=buildProps({
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
    type: String,
    required: true,
    default: ''
  },
  format:{
    type:String,
  },
  formatValue:{
    type:Function,
  },
  opType:{
    type:String,
    default:'day'
  }
})
export const  datePickerEmit =['blur', 'input', 'update:modelValue']

export const nm = useNmSpace('datePicker')
 