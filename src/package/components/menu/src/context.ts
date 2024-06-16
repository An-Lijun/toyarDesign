import useNmSpace from "../../../../package/hooks/useBem"

export const nm =useNmSpace('menu')

export const subNm =useNmSpace('sub-menu')

export const menuProps={
  option:{
    type:Array,
  },
  isFold:{
    type:Boolean,
    default:false
  }
}
