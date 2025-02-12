import buildProps from '../../../utils/buildProps';
import useNmSpace from '../../../hooks/useBem';
import { TY_SIZE } from '../../../constant'

export const timeProps =buildProps({
  modelValue: {
    type: String
  },
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
  format:{
    type:String,
  },
  formatValue:{
    type:Function,
  }
})
export const timeEmits  =['blur', 'input', 'update:modelValue']

export const nm = useNmSpace('timePicker')