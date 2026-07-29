import buildProps from '../../../utils/buildProps';
import useNmSpace from '../../../hooks/useBem';

export const tabsProps =buildProps({
  /** 当前激活的标签页值（v-model绑定） */
  modelValue: {
    type: String
  },
  /** 标签页类型 */
  type: {
    type: String,
    default: 'normal'
  },
  /** 标签页位置 */
  position: {
    type: String,
    default: 'top'
  },
  /** 触发方式 */
  trigger: {
    type: String,
    default: 'click'
  }
})
export const tabsEmits =['update:modelValue']

export const nm = useNmSpace('tabs')