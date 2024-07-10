import { buildProps } from '@/package/utils/buildProps';
import useNmSpace from '../../../hooks/useBem';
export const transProps =buildProps({
  data: {
    type: Array,
    required: true
  }
})

export const transEmits =[]

export const nm = useNmSpace('transfer')