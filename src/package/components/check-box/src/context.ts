import useNmSpace from '../../../hooks/useBem'
import { TY_SIZE } from '../../../constant'
export const nm = useNmSpace('check-box')
export const checkProps ={
  size: {
    type: String,
    default: 'small',
    validator: (value:string) => {
      return TY_SIZE.includes(value)
    }
  },
  modelValue: {
    type: [String, Number],
    required: true,
    default: ''
  },
  value:{
    type:String,
    required:true
  },
  canHarf:{
    type:Boolean,
    default:false
  },
  disabled:{
    type:Boolean,
    default:false
  }
}

export const checkEmits =['update:modelValue','change']
