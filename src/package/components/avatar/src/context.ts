import buildProps from '../../../utils/buildProps'
import useNmSpace from '../../../hooks/useBem'

export const backTopProps = buildProps({
  width:{
    type:Number
  },
  shape:{
    type:String,
    values:['circle','square'],
    default:''
  },
  autoSize:{
    type:Boolean,
    default:true
  },
})
// "circle" //square

export  const nm = useNmSpace('avatar')