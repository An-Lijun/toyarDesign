import { buildProps } from "@/package/utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"
import { TY_SIZE } from "@/package/constant"

export const listProps =buildProps({
  header: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'small',
    values:TY_SIZE
  }
})

export const listNm = useNmSpace('list')
