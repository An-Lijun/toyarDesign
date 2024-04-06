import useNmSpace from '../../../hooks/useBem';

export const sliderProps ={
  modelValue: {
    type: [String, Number],
    required: true,
    default: ''
  },
  min:{
    type:String||Number,
    default:0
  },
  max:{
    type:String||Number,
    default:100
  },
  width:{
    type:String||Number,
    default:10
  }
}

export const sliderEmits =['update:modelValue']

export const nm =useNmSpace('slider')