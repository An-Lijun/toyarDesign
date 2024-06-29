import useNmSpace from "../../../hooks/useBem"

export const cProps ={
  theme:{
    type:String,
    default:'light'
  },
  options: {
    type: Object,
    default:()=>({})
  },
}

export const nm = useNmSpace('configProvider')