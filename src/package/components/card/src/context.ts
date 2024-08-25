
import useNmSpace from '../../../hooks/useBem'
import { buildProps } from '../../../utils/buildProps'

export const cardProp=buildProps({
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
})
export const nm = useNmSpace('card')
