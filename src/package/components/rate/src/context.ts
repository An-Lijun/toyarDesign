import { buildProps } from "@/package/utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"

export const rateProps =buildProps({
  modelValue: {
    type: String,
    default:0
  },
  max: {
    type: Number,
    default: 5
  },
  allowHalf: {
    type: Boolean,
    default: false
  }
})

export const rateEmits =['update:modelValue']
 
export const nm = useNmSpace('rate')