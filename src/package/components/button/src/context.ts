import useNmSpace from '../../../hooks/useBem'

import { TY_STATE,TY_SIZE} from '../../../constant';

export const buttonProps = {
  state: {
    type: String,
    default: "primary",
    validator: (value:any) => {
      return TY_STATE.includes(
        value
      );
    }
  },
  type:{
    type:String,
    default: "normal",
    validator: (value:string) => {
      return ["normal", "secondary",  "dashed",'text','link'].includes(
        value
      );
    }
  },
  block:{
    type:Boolean,
    default:false
  },
  disabled:{
    type:Boolean,
    default:false
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
  'html-type':{
    type: String,
    default: "button",
    validator: (value:string) => {
      return ["button", "submit", "reset"].includes(value);
    }
  },
  shape:{
    type: String,
    default: "square",
    validator: (value:string) => {
      return ["square", "round", "circle"].includes(
        value
      );
    }
  },
  loading:{
    type: Boolean,
    default:false
  }
}
export const nm = useNmSpace('button')
