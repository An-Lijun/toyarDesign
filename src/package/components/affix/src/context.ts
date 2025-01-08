import buildProps  from '../../../utils/buildProps'
import useNmSpace from '../../../hooks/useBem'

export const affixProps = buildProps({
  offsetTop: {
    type: Number,
    default: 0
  },
  offsetBottom: {
    type: Number
  },
  target:{
    type:Element,
  }
})
// "circle" //square

export const nm = useNmSpace('affix')