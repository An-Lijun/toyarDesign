import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"

export const lodProps = buildProps({
  isFixed: {
    type: Boolean,
    default: false
  }
})

export const nm = useNmSpace('loading')