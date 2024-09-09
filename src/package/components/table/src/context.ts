import { buildProps } from '../../../utils/buildProps';
import useNmSpace from '../../../hooks/useBem';
import { TY_SIZE } from "../../../constant"

export const tableProps =buildProps({
  size: {
    type: String,
    values:TY_SIZE,
    default:'small'
  },
  align:{
    type: String,
    values:['left','center','right'],
    default:'center'
  },
  columns:{
    type:Array,
    default:[],
  },
  data:{
    type:Array,
    default:[]
  },
  rowKey:{
    type:String,
    default:'key',
    required:true
  },
  rowSelection:{
    type:Object
  },
  borders:{
    type:Array,
    default:['row','out']
    // out  row / column 
  },
  showOverflow:{
    type:String,
    values:['ellipsis','title','tooltip','none'],
    default:''
  },
  stripe:{
    type:Boolean,
    default:false
  }
  
})

export const nm =useNmSpace('table')