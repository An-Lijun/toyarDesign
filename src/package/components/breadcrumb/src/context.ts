import buildProps  from '../../../utils/buildProps'
import useNmSpace from '../../../hooks/useBem'

export const nm = useNmSpace('breadcrumb')

export const nmI = useNmSpace('breadcrumb-item')
export const breadProps =buildProps({
  separator:{
    type:String,
    default:'/'
  }
})

export const breadItemProps =buildProps({
  to:{
    type:String,
    default:''
  }
})
