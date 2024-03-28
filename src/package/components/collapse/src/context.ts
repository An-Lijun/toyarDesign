import useNmSpace from "../../../hooks/useBem"

export const colProps ={
  modelValue: {
    type: Array
  },
  disabled: {
    type: Boolean,
    default:false
  },
  accordion: {
    type: Boolean,
    default:false
  },
  hide: {
    type: Boolean,
    default:false
  },
  positionLeft:{
    type:Boolean,
    default:false
  },
  destroy:{
    type: Boolean,
    default:false
  }
}
export const itemProp={
  title: {
    type: String
  },
  name: {
    type: String,
    required: true
  }
}
export const colEmt=['update:modelValue']

export const nm = useNmSpace('collapse')