import useNmSpace from '../../../hooks/useBem'

export const backTopProps = {
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
  circle: {
    type: Boolean,
    default: false, 
  }
}
// "circle" //square

export  const nm = useNmSpace('backTop')