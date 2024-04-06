import useNmSpace from '../../../hooks/useBem';

export const rowProps ={
  type: {
    type: String,
    default: 'line'
  },
  gutter: {
    type: Number,
    default: 0
  },
  justify: {
    type: String,
    default: 'top'
  },
  align: {
    type: String,
    default: 'center'
  }
}
export const nm =useNmSpace('row')
 