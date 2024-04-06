import useNmSpace from '../../../hooks/useBem';

export const waterProps ={
  markInfo: {
    type: String || Array,
    required: true
  },
  options: {
    type: Object
  }
}
export const nm =useNmSpace('waterMark')
