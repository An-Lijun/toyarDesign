import useNmSpace from '../../../hooks/useBem';


export const nm =useNmSpace('select')

export const selProps ={
  size: {
    type: String,
    default: 'small',
    validator: (value:string) => {
      return ['mini', 'small', 'medium', 'large'].includes(value)
    }
  },
  multiple:{
    type: Boolean,
    default: false
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
    type: [String, Number,Array],
    required: true,
  },
  placeholder:{
    type: String,
    default: ''
  }
}

export const groupProps ={
  title:{
    type:String,
    default:''
  }
}
export const selEmits =['blur', 'input', 'update:modelValue']


export const opNm =useNmSpace('option')

export const opProps ={
  label: {
    type: String,
    default: ''
  },
  value:{
    type: String,
    default: ''
  },
  disabled:{
    type:Boolean,
    default:false
  }
}
export const opEmits =['update:modelValue']