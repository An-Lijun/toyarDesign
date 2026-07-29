import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../../package/hooks/useBem"

export const nm =useNmSpace('menu')

export const subNm =useNmSpace('sub-menu')

export const menuProps=buildProps({
  /** 当前选中的菜单值（v-model） */
  modelValue: {
    type: [String, Number],
    required: true,
  },
  /** 菜单选项数据 */
  option:{
    type:Array,
  },
  /** 是否折叠菜单 */
  isFold:{
    type:Boolean,
    default:false
  },
  /** 主题样式 */
  theme:{
    type: String,
    values:['design','dark','light','rDesign'],
    default:'design',
    required: true,
  }
})

export const emits =['update:modelValue','change','open','subOpen']