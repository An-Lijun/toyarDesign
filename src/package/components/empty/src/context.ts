import useNmSpace from "../../../hooks/useBem";

export const emptyProps ={
  title: {
    type: String,
    default: "暂无数据"
  },
  size: {
    type: Number,
    default: 54
  }
}

export const nm = useNmSpace('empty')