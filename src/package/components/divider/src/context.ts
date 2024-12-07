import buildProps from "../../../utils/buildProps";
import useNmSpace from "../../../hooks/useBem";

export const dividerProps=buildProps({
  direction: {
    type: String,
    default: "row",
    values:["row", "column"]
  },
  position: {
    type: String,
    default: "center",
    values:["center", "left", "right",'bottom','top']
  },
})

export const nm =useNmSpace('divider')