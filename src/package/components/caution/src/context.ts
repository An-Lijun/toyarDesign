import { buildProps } from '@/package/utils/buildProps';
import useNmSpace from '../../../hooks/useBem';

export const cProps =buildProps({
  type:{
    type: String,
    default: 'info'
  },
  title:{
    type:String
  }
})

export const nm = useNmSpace('caution')