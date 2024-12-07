import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../hooks/useBem"

export  const iconProps=buildProps({
  icon: {
    type: String,
    default: ""
  },
  size: {
    type:Number,
    default: 0
  },
  color:{
    type:String
  }
})

export const nm =useNmSpace('icon')