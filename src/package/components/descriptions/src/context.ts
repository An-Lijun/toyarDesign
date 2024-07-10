import useNmSpace from "../../../hooks/useBem"
import { TY_SIZE} from '../../../constant';
import { buildProps } from "@/package/utils/buildProps";

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
    default: "center",
    values:['left','center','right']
  },
  layout:{
    type: String,
    default: "cloumn",
    validator: (value:string) => {
      return ['cloumn','row'].includes(
        value
      );
    }
  }
})

export const  nm = useNmSpace('descriptions')