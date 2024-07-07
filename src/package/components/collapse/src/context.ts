import useNmSpace from "../../../hooks/useBem"

export const colProps ={
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
export const colEmt=[]

export const nm = useNmSpace('collapse')