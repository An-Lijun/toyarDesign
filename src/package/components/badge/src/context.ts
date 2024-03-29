import useNmSpace from '../../../hooks/useBem'

export const badgeProp={
  text: {
    type: String,
    default: ""
  },
  max:{
    type:String||Number,
    default:99
  },
  dot:{
    type:Boolean,
    default:false
  },
  status:{
    type:String,
    default:'danger'
  }
}

export  const nm = useNmSpace('badge')