import useNmSpace from '../../../hooks/useBem'
import { TY_SIZE } from '../../../constant'
import { buildProps } from '../../../utils/buildProps'

export const nm = useNmSpace('check-box')

export const checkProps =buildProps({
  size: {
    type: String,
    values:TY_SIZE
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
})

export const checkEmits =['change']


export const checkGroupProps = buildProps({
  size: {
    type: String,
    values:TY_SIZE
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
})

export const checkGroupEmits =['update:modelValue','change']
