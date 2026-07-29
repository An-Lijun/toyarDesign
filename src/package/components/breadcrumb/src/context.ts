import buildProps  from '../../../utils/buildProps'
import useNmSpace from '../../../hooks/useBem'

export const nm = useNmSpace('breadcrumb')

export const nmI = useNmSpace('breadcrumb-item')
export const breadProps =buildProps({
  /** 分隔符 */
  separator:{
    type:String,
    default:'/'
  }
})

export const breadItemProps =buildProps({
  /** 跳转路径 */
  to:{
    type:String,
    default:''
  }
})
