import buildProps from '../../../utils/buildProps';
import useNmSpace from '../../../hooks/useBem';
import { TY_SIZE } from "../../../constant"

export const tableProps =buildProps({
  /** 表格尺寸 */
  size: {
    type: String,
    values:TY_SIZE,
    default:'small'
  },
  /** 对齐方式 */
  align:{
    type: String,
    values:['left','center','right'],
    default:'center'
  },
  /** 列配置 */
  columns:{
    type:Array,
    default:[],
  },
  /** 表格数据 */
  data:{
    type:Array,
    default:[]
  },
  /** 行唯一标识字段 */
  rowKey:{
    type:String,
    default:'key',
    required:true
  },
  /** 行选择配置 */
  rowSelection:{
    type:Object
  },
  /** 边框配置 */
  borders:{
    type:Array,
    default:['row','out']
    // out  row / column 
  },
  /** 溢出显示方式 */
  showOverflow:{
    type:String,
    values:['ellipsis','title','tooltip','none'],
    default:''
  },
  /** 是否显示斑马纹 */
  stripe:{
    type:Boolean,
    default:false
  }
  
})

export const nm =useNmSpace('table')