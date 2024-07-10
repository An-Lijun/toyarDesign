import { buildProps } from '@/package/utils/buildProps';
import useNmSpace from '../../../hooks/useBem';

export const tableProps =buildProps({
  columns:{
    type:Array,
    default:()=>{
      return []
    },
  },
  data:Array,
    default:()=>{
      return []
    },
})

export const nm =useNmSpace('table')