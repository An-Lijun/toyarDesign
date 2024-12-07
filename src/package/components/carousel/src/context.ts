import buildProps from '../../../utils/buildProps';
import useNmSpace from '../../../hooks/useBem';

export const carProps =buildProps({
  showIndicator:{
    type:Boolean,
    default:true
  },
  interval:{
    type:Number,
    default:3000
  }
})

export const nm = useNmSpace('carousel')