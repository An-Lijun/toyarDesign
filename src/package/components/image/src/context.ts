import useNmSpace from "../../../hooks/useBem"

export const imgProps ={
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
    validator(value:string) {
      return ['square', 'circle'].includes(value)
    }
  },
  fit: {
    type: String,
    default:'none',
    validator(value:string) {
      return ['none', 'fill', 'contain', 'cover', 'scale-down'].includes(value)
    }
  },
  alt: {
    type: String
  }
}
export const nm = useNmSpace('image')