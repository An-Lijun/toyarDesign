import useNmSpace from "../../../../package/hooks/useBem"

export const pagProps ={
  total: {
    type: [String, Number],
    required: true,
    default: ''
  }
}

export const nm = useNmSpace('pagination')