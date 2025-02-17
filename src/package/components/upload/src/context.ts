import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"

export const upProps =buildProps({
  disabled:{
    type:Boolean,
    default:false
  },
  dragger:{
    type:Boolean,
    default:false
  },
  drag:{
    type:Boolean,
    default:false
  },
  accept:{
    type:String,
    default:''
  }
})

export const nm =useNmSpace('upload')