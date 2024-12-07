import buildProps from '../../../utils/buildProps';
import useNmSpace from '../../../hooks/useBem';

export const tabsProps =buildProps({
  modelValue: {
    type: String
  },
  type: {
    type: String,
    default: 'normal'
  },
  position: {
    type: String,
    default: 'top'
  },
  trigger: {
    type: String,
    default: 'click'
  }
})
export const tabsEmits =['update:modelValue']

export const nm = useNmSpace('tabs')