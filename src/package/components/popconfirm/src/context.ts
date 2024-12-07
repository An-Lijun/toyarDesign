import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"

export const popProps =buildProps({
  placement: {
    type: String,
    default: 'top'
  },
  content:{
    type: String,
    default: ''
  },
  rejectText:{
    type:String,
    default:'取消'
  },
  showRejectBtn:{
    type:Boolean,
    default:true
  },
  resloveText:{
    type:String,
    default:'确定'
  },
  showResloveBtn:{
    type:Boolean,
    default:true
  }
})

export const nm =useNmSpace('popconfirm')