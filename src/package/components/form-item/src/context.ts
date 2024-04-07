import useNmSpace from "../../../hooks/useBem"


export const itemProps ={
  prop: String,
  disabled:{
    type:Boolean,
    default: false
  },
  readonly:{
    type:Boolean,
    default: false
  }

}

export const nm = useNmSpace('form-item')