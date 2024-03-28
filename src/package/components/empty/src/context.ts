import useNmSpace from "../../../hooks/useBem";

export const emptyProps ={
  title: {
    type: String,
    default: "暂无数据"
  }
}

export const nm = useNmSpace('empty')