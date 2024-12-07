import buildProps from '../../../utils/buildProps';
import useNmSpace from '../../../hooks/useBem';
import { TY_SIZE } from '../../../constant';

export const switchProps =buildProps({
  size: {
    type: String,
    default: 'small',
    values:TY_SIZE
  },
  uncheckedText: {
    type: String,
    default: ''
  },
  checkedText: {
    type: String,
    default: ''
  },
  openValue:{
    type:[String,Boolean],
  },
  disabled:{
    type:Boolean,
    default:false
  },
  closeValue:{
    type:[String,Boolean],
  },
  type:{
    type:String,
    default: 'round',
    values:['round', 'tube', 'inline']
  }
})

export const switchEmits =['update:modelValue','change']

export const nm =useNmSpace('switch')