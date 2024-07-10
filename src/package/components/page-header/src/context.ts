
import { buildProps } from "@/package/utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"

export const hdProps =buildProps({
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  },
  showBack: {
    type: Boolean,
    default: true
  }
})

export const hdEmits =['back']


export const nm = useNmSpace('pageHeader')