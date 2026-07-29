import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../hooks/useBem"

export const colProps =buildProps({
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default:false
  },
  /** 是否手风琴模式 */
  accordion: {
    type: Boolean,
    default:false
  },
  /** 是否隐藏 */
  hide: {
    type: Boolean,
    default:false
  },
  /** 面板位置是否在左侧 */
  positionLeft:{
    type:Boolean,
    default:false
  },
  /** 切换时是否销毁子元素 */
  destroy:{
    type: Boolean,
    default:false
  }
})
export const itemProp=buildProps({
  /** 面板标题 */
  title: {
    type: String
  },
  /** 面板名称（唯一标识） */
  name: {
    type: String,
    required: true
  }
})
export const colEmt=[]

export const nm = useNmSpace('collapse')