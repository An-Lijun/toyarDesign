import useNmSpace from "../../../../package/hooks/useBem"

export const listProps ={
  header: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'small',
    validator: (value:string) => {
      return ['mini', 'small', 'medium', 'large'].includes(value)
    }
  }
}

export const listNm = useNmSpace('list')
