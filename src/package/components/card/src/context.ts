
import useNmSpace from '../../../hooks/useBem'

export const cardProp={
  border: {
    type: Boolean,
    default: true
  },
  shadow: {
    type: String,
    default: 'none'
  },
  isLoading:{
    type: Boolean,
    default:false
  }
}
export const nm = useNmSpace('card')
