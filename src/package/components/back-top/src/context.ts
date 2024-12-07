import buildProps from '../../../utils/buildProps'
import useNmSpace from '../../../hooks/useBem'

export const backTopProps = buildProps({
  vHeight: {
    type: Number,
    default: 200,
  },
  right: {
    type: Number,
    default: 40,
  },
  bottom: {
    type: Number,
    default: 40,
  },
  target: {
    type: String,
    default: '',
  },
  circle: {
    type: Boolean,
    default: false, 
  }
})
// "circle" //square

export  const nm = useNmSpace('backTop')