import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"

export const pagProps =buildProps({
  current: {
    type: [String, Number],
    required: true,
    default: '1'
  },
  total: {
    type: [String, Number],
    required: true,
    default: ''
  },
  pageSize: {
    type: [String, Number],
    required: true,
    default: '5'
  },
})

export const nm = useNmSpace('pagination')