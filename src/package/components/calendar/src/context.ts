import { TY_SIZE } from '@/package/constant'
import useNmSpace from '../../../hooks/useBem'
import { buildProps } from '@/package/utils/buildProps'

export const calendarProp=buildProps({
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
})
export const calendarEmit =['blur', 'input', 'update:modelValue']

export const nm = useNmSpace('calendar')
 