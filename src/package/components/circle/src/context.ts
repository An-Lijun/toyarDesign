import buildProps  from '../../../utils/buildProps'
import useNmSpace from '../../../hooks/useBem'

export const circleProps =buildProps({
  percent: {
    type: Number,
    default: 0
  },
  size: {
    type: Number,
    default: 120
  },
  strokeWidth: {
    type: Number,
    default: 6
  },
  strokeColor: {
    type: String,
    default: '#298DFF'
  },
  strokeLinecap: {
    type:String,
    values:['square', 'round'],
    default: 'round'
  },
  trailWidth: {
    type: Number,
    default: 5
  },
  trailColor: {
    type: String,
    default: '#F7F7F7'
  }
})
export const nm = useNmSpace('circle')
 