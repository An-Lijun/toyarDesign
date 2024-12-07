import buildProps from "../../../utils/buildProps";
import useNmSpace from "../../../hooks/useBem";

export const dProps =buildProps({
  width:{
    type:Number,
    default:300
  }
})

export const nm = useNmSpace('drawer')

export const dEmits = []