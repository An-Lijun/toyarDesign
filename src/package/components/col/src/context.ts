import { buildProps } from '../../../utils/buildProps'
import useNmSpace from '../../../hooks/useBem'

export const colProps =buildProps({
  span: {
    type: [Number, Object,String],
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  }
})
export const nm = useNmSpace('col')
 