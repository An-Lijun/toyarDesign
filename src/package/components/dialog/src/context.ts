import useNmSpace from "../../../hooks/useBem"

export const dialogProp={
  title: {
    type: String,
    default: "提示",
  },
  width: {
    type: String,
    default: "30%",
  },
  top: {
    type: String,
    default: "15vh",
  },

  info:{
    type:String,
  },
  isUnderLine:{
    type: Boolean,
    default: true,
  }
}
export const dialogEmit=[]

export const  nm = useNmSpace('dialog')