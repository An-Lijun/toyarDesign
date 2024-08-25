import { buildProps } from "../../../utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"
import { TY_MOOD_LS } from "../../../constant"

export const notProps =buildProps({
  type: {
    type: String,
    values:TY_MOOD_LS
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  top: {
    type: String
  },
  time:{
    type: String
  }
})
export const notEmits =['close']

export const nm = useNmSpace('notification')