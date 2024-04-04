import useNmSpace from "../../../../package/hooks/useBem"

export const notProps ={
  type: {
    type: String,
    validator (value:string) {
      if (value) {
        return ['info', 'success', 'warning', 'error'].includes(value)
      }
      return true
    }
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  top: {
    type: String
  },
  time:{
    type: String
  }
}
export const notEmits =['close']

export const nm = useNmSpace('notification')