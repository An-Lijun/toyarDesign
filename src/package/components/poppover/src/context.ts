import useNmSpace from "../../../../package/hooks/useBem"

export const popProps ={
  placement: {
    type: String,
    default: 'top'
  },
  content:{
    type: String,
    default: ''
  },
  trigger:{
    type:String,
    default:'hover'
  }
}
export const nm =useNmSpace('poppover')