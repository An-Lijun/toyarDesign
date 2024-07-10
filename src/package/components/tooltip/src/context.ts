import { buildProps } from '@/package/utils/buildProps';
import useNmSpace from '../../../hooks/useBem';
export const toolProps=buildProps({
  content: {
    type: String,
    default: ''
  },
  placement: {
    type: String,
    default: 'top'
  },
  trigger: {
    type: String,
    default: 'hover'
  }
})

export const nm = useNmSpace('tooltip')