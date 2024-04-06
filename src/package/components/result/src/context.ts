
import useNmSpace from "../../../../package/hooks/useBem"

export const resProps ={
  type: {
    type: String,
    required: true,
    validator(value:string) {
      return ['info', 'success', 'warning', 'error'].includes(value)
    }
  },
  title: {
    type: String
  },
  subTitle: {
    type: String
  },
  size:{
    type:String,
    default:'100'
  }
}
export const nm = useNmSpace('result')
