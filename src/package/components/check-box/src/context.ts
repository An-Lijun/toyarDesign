import useNmSpace from '../../../hooks/useBem'
import { TY_SIZE } from '../../../constant'
import buildProps from '../../../utils/buildProps'

export const nm = useNmSpace('check-box')

export const checkProps =buildProps({
  /** 尺寸大小 */
  size: {
    type: String,
    values:TY_SIZE
  },
  /** 绑定值 */
  value:{
    type:[String,Number],
  },
  /** 是否可选半选状态 */
  canHarf:{
    type:Boolean,
    default:false
  },
  /** 是否禁用 */
  disabled:{
    type:Boolean,
    default:false
  },
  /** 最大可选数量 */
  max:{
    type:[String, Number],
    default: ''
  }
})

export const checkEmits =['change']


export const checkGroupProps = buildProps({
  /** 尺寸大小 */
  size: {
    type: String,
    values:TY_SIZE
  },
  /** 绑定值（v-model） */
  modelValue: {
    type: [Array,Boolean],
    default: ''
  },
  /** 是否禁用 */
  disabled:{
    type:Boolean,
    default:false
  },
  /** 最大可选数量 */
  max:{
    type:[String, Number],
    default: ''
  }
})

export const checkGroupEmits =['update:modelValue','change']