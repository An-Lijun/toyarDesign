import buildProps from '../../../utils/buildProps';
import useNmSpace from '../../../hooks/useBem';

export const cProps =buildProps({
  type:{
    type: String,
    default: 'info'
  },
  title:{
    type:String
  },
  isShowIcon:{
    type:Boolean,
    default:true
  }
})

export const nm = useNmSpace('caution')