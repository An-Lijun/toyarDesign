import useNmSpace from "../../../hooks/useBem"
import { TY_SIZE} from '../../../constant';
import { buildProps } from "../../../utils/buildProps";

export const descProp=buildProps({
  title: {
    type: String,
    default: "",
  },
  data:{
    type: Array,
  },
  column:{
    type:Number,
    default:3
  },
  size:{
    type: String,
    default: "small",
    values:TY_SIZE
  },
  align:{
    type: String,
    default: "left",
    values:['left','center','right']
  },
  layout:{
    type: String,
    default: "column",
    validator: (value:string) => {
      return ['column','row'].includes(
        value
      );
    }
  },
  border:{
    type:Boolean,
    default:false
  }
})

export const  nm = useNmSpace('descriptions')