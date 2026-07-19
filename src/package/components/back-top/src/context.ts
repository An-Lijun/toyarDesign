import buildProps from '../../../utils/buildProps'
import useNmSpace from '../../../hooks/useBem'

export const staticProps = {
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
}

export const backTopProps = buildProps(staticProps)

export const nm = useNmSpace('backTop')

export interface BackTopEmits {
  'click': () => boolean
}

export const backTopEmits: BackTopEmits = {
  'click': () => true
}