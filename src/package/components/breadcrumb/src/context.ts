import useNmSpace from '../../../hooks/useBem'

export const nm = useNmSpace('breadcrumb')

export const nmI = useNmSpace('breadcrumb-item')

export const breadProps ={
  separator:{
    type:String,
    default:'/'
  }
}

export const breadItemProps ={
  to:{
    type:String,
    default:''
  }
}
