import useNmSpace from '../../../hooks/useBem'

export const colProps ={
  span: {
    type: [Number, Object],
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  }
}
export const nm = useNmSpace('col')
 