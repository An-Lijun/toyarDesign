import useNmSpace from '../../../hooks/useBem';

export const switchProps ={
  size: {
    type: String,
    default: 'small',
    validator: (value:string) => {
      return ['mini', 'small', 'medium', 'large'].includes(value)
    }
  },
  uncheckedText: {
    type: String,
    default: ''
  },
  checkedText: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [Boolean,String,Number],
    required: true,
    default: false
  },
  openValue:{
    type:String,
  },
  disabled:{
    type:Boolean,
    default:false
  },
  closeValue:{
    type:String,
  },
  type:{
    type:String,
    default: 'round',
      validator: (value:string) => {
        return ['round', 'tube', 'inline'].includes(value)
      }
    }
}
export const switchEmits =['update:modelValue','change']

export const nm =useNmSpace('switch')