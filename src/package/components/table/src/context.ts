import useNmSpace from '../../../hooks/useBem';

export const tableProps ={
  columns:{
    type:Array,
    default:()=>{
      return []
    },
  },
  data:Array,
    default:()=>{
      return []
    },
}

export const nm =useNmSpace('table')