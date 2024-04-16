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
  },
  label:{
    type:String,
    default: ''
  }

}

export const nm = useNmSpace('form-item')