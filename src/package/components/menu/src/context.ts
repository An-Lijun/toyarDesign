import useNmSpace from "../../../../package/hooks/useBem"

export const nm =useNmSpace('menu')

export const subNm =useNmSpace('sub-menu')

export const menuProps={
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
}
export const emits =['update:modelValue','change']
