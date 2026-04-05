import useNmSpace from '../../../hooks/useBem'
import buildProps from '../../../utils/buildProps';

export const staticProps ={
  offset: {
    type: Number,
    default: 8
  },
  max: {
    type: Number,
  }
}
export const avatarGroupProps = buildProps(staticProps)

export const nm = useNmSpace('avatar-group')
