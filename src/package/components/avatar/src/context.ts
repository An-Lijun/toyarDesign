import buildProps from '../../../utils/buildProps'
import useNmSpace from '../../../hooks/useBem'

export const staticProps = {
  width:{
    type:Number
  },
  shape:{
    type:String,
    values:['circle','square'],
    default:''
  },
  autoSize:{
    type:Boolean,
    default:true
  },
}

export const avatarProps = buildProps(staticProps)

export const nm = useNmSpace('avatar')

export interface AvatarEmits {
  'trigger': () => boolean
}

export const avatarEmits: AvatarEmits = {
  'trigger': () => true
}