import buildProps from '../../../utils/buildProps';
import useNmSpace from '../../../hooks/useBem';

export const smsCodeProps =buildProps({
  modelValue: {
    type: String
  },
  length:{
    type:Number,
    default:6
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  regCodes:{
    type:Array,
    default:() => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  },
  gap:{
    type:Number,
    default:12
  }
})
export const smsEmit  =['success', 'update:modelValue']

export const nm = useNmSpace('smsCodeInput')