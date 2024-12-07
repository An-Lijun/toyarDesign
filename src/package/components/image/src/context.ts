import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../hooks/useBem"

export const imgProps = buildProps({
  src: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: '100'
  },
  shape: {
    type: String,
    default: 'square',
    values: ['square', 'circle']

  },
  fit: {
    type: String,
    default: 'none',
    values: ['none', 'fill', 'contain', 'cover', 'scale-down']
  },
  alt: {
    type: String
  }
})
export const nm = useNmSpace('image')