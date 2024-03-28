import useNmSpace from '../../../hooks/useBem';

export const carProps ={
  showIndicator:{
    type:Boolean,
    default:true
  },
  interval:{
    type:Number,
    default:3000
  }
}

export const nm = useNmSpace('carousel')