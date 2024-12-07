import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"

export const pagProps =buildProps({
  total: {
    type: [String, Number],
    required: true,
    default: ''
  }
})

export const nm = useNmSpace('pagination')