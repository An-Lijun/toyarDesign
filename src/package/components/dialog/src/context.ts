import useNmSpace from "@/package/hooks/useBem"

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
  visible: {
    type: Boolean,
    default: false,
  },
  info:{
    type:String,
  }
  
}
export const dialogEmit=["update:visible"]

export const  nm = useNmSpace('dialog')