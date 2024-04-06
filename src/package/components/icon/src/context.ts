import useNmSpace from "../../../hooks/useBem"

export  const iconProps={
  icon: {
    type: String,
    default: ""
  },
  size: {
    type:Number,
    default: 0
  },
  color:{
    type:String
  }
}

export const nm =useNmSpace('icon')