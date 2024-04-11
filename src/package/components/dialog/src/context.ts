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
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
  },
  info:{
    type:String,
  },
  isUnderLine:{
    type: Boolean,
    default: true,
  }
}
export const dialogEmit=["update:modelValue"]

export const  nm = useNmSpace('dialog')