import useNmSpace from '../../../hooks/useBem';

export const cProps ={
  type:{
    type: String,
    default: 'info'
  },
  title:{
    type:String
  }
}

export const nm = useNmSpace('caution')