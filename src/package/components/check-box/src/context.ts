import useNmSpace from '../../../hooks/useBem'
import { TY_SIZE } from '../../../constant'

export const nm = useNmSpace('check-box')

export const checkProps ={
  size: {
    type: String,
    validator: (value:string) => {
      return TY_SIZE.includes(value)
    }
  },
  modelValue: {
    type: [Array,Boolean],
    default: ''
  },
  value:{
    type:[String,Number],
    required:true
  },
  canHarf:{
    type:Boolean,
    default:false
  },
  disabled:{
    type:Boolean,
    default:false
  },
  max:{
    type:[String, Number],
    default: ''
  }
}

export const checkEmits =['update:modelValue','change']


export const checkGroupProps ={
  size: {
    type: String,
    validator: (value:string) => {
      return TY_SIZE.includes(value)
    }
  },
  modelValue: {
    type: [Array,Boolean],
    default: ''
  },
  disabled:{
    type:Boolean,
    default:false
  },
  max:{
    type:[String, Number],
    default: ''
  }
}

export const checkGroupEmits =['update:modelValue','change']
