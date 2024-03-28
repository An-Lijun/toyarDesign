import useNmSpace from "../../../hooks/useBem";

export const dividerProps={
  direction: {
    type: String,
    default: "row",
    validator: (value:string) => {
      return ["row", "column"].includes(value);
    },
  },
  position: {
    type: String,
    default: "center",
    validator: (value:string) => {
      return ["center", "left", "right",'bottom','top'].includes(value);
    },
  },
}

export const nm =useNmSpace('divider')