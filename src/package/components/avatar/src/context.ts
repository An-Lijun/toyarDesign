import { buildProps } from '@/package/utils/buildProps'
import useNmSpace from '../../../hooks/useBem'

export const backTopProps = buildProps({
  width:{
    type:Number
  },
  shape:{
    type:String,
    values:['circle','square'],
    default:''
  }
})
// "circle" //square

export  const nm = useNmSpace('avatar')