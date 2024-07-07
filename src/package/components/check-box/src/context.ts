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
  value:{
    type:[String,Number],
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

export const checkEmits =['change']


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
