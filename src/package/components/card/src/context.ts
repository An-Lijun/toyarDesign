
import useNmSpace from '../../../hooks/useBem'

export const cardProp={
  border: {
    type: Boolean,
    default: true
  },
  shadow: {
    type: String,
    default: 'none'
  }
}
export const nm = useNmSpace('card')
