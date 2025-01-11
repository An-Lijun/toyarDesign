import useNmSpace from '../../../hooks/useBem'
import buildProps from '../../../utils/buildProps'

export const calendarProp = buildProps({
  dayItemHeight: {
    type: Number,
    default: 110
  }
})
export const calendarEmit = ['click']

export const nm = useNmSpace('calendar')
