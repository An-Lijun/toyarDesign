import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"

export const popProps =buildProps({
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
})
export const nm =useNmSpace('poppover')