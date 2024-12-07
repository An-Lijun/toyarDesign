
import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"

export const msgProps= buildProps({
  msg: {
    type: String,
    required: true
  },
  options: {
    type: Object
  },
  top: {
    type: String,
    default: '0'
  }
})

export const msgEmit=['close']

export const nm = useNmSpace('message')