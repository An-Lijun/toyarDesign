import buildProps from '../../../utils/buildProps';
import useNmSpace from '../../../hooks/useBem';

export const carProps =buildProps({

  interval:{
    type:Number,
    default:3000
  },

  arrowMode:{
    type:String,
    default:'hover',
    values:['hover','always','never']
  },
  easing:{
    type:String,
    default:'ease',
    // values:['ease','linear','ease-in','ease-out','ease-in-out']
  },
  isAutoPlay:{
    type:Boolean,
    default:true
  },
  indicatorType:{
    type:String,
    default:'line',
    values:['dot','line','slider']
  },
  indicatorPosition:{
    type:String,
    default:'right',
    values:['top','left','right','bottom']
  },
  direction:{
    type:String,
    default:'horizontal',
    values:['horizontal','vertical']
  }
})

export const nm = useNmSpace('carousel')