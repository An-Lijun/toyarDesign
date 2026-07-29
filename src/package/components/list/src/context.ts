import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"
import { TY_SIZE } from "../../../constant"

export const listProps =buildProps({
  /** 列表头部标题 */
  header: {
    type: String,
    default: ''
  },
  /** 尺寸大小 */
  size: {
    type: String,
    default: 'small',
    values:TY_SIZE
  }
})

export const listNm = useNmSpace('list')