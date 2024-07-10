
import { buildProps } from "@/package/utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"
import { TY_MOOD_LS } from "@/package/constant"

export const resProps =buildProps({
  type: {
    type: String,
    required: true,
    values:TY_MOOD_LS
  },
  title: {
    type: String
  },
  subTitle: {
    type: String
  },
  size:{
    type:String,
    default:'100'
  }
})

export const nm = useNmSpace('result')
