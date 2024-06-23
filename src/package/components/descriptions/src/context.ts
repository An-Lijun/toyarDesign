import useNmSpace from "../../../hooks/useBem"
import { TY_SIZE} from '../../../constant';

export const descProp={
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
    validator: (value:string) => {
      return TY_SIZE.includes(
        value
      );
    }
  },
  align:{
    type: String,
    default: "center",
    validator: (value:string) => {
      return ['left','center','right'].includes(
        value
      );
    }
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
}

export const  nm = useNmSpace('descriptions')