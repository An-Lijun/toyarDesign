import useNmSpace from "../../../hooks/useBem";

export const dProps ={
  modelValue: {
    type: Boolean,
    required: true,
    default: ''
  },
  width:{
    type:Number,
    default:300
  }
}

export const nm = useNmSpace('drawer')

export const dEmits = ['update:modelValue']