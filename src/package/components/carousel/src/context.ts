import buildProps from '../../../utils/buildProps';
import useNmSpace from '../../../hooks/useBem';

export const carProps =buildProps({
  /** 自动切换间隔时间（毫秒） */
  interval:{
    type:Number,
    default:3000
  },
  /** 箭头显示模式 */
  arrowMode:{
    type:String,
    default:'hover',
    values:['hover','always','never']
  },
  /** 过渡动画效果 */
  easing:{
    type:String,
    default:'ease',
    // values:['ease','linear','ease-in','ease-out','ease-in-out']
  },
  /** 是否自动播放 */
  isAutoPlay:{
    type:Boolean,
    default:true
  },
  /** 指示器类型 */
  indicatorType:{
    type:String,
    default:'line',
    values:['dot','line','slider']
  },
  /** 指示器位置 */
  indicatorPosition:{
    type:String,
    default:'right',
    values:['top','left','right','bottom']
  },
  /** 轮播方向 */
  direction:{
    type:String,
    default:'horizontal',
    values:['horizontal','vertical']
  }
})

export const nm = useNmSpace('carousel')