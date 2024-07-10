import { buildProps } from "@/package/utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"

export const nm =useNmSpace('menu')

export const subNm =useNmSpace('sub-menu')

export const menuProps=buildProps({
  modelValue: {
    type: [String, Number,Array],
    required: true,
  },
  option:{
    type:Array,
  },
  isFold:{
    type:Boolean,
    default:false
  }
})

export const emits =['update:modelValue','change']
