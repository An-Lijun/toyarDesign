import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../hooks/useBem"

export const configProps =buildProps({
  theme:{
    type:String,
    default:'light'
  },
  options: {
    type: Object,
    default:()=>({})
  },
})

export const nm = useNmSpace('configProvider')