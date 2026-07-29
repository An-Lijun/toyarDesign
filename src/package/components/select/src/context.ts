import buildProps from '../../../utils/buildProps';
import useNmSpace from '../../../hooks/useBem';
import { TY_SIZE } from '../../../constant';


export const nm =useNmSpace('select')

export const selProps =buildProps({
  /** 选择器尺寸 */
  size: {
    type: String,
    default: 'small',
    valuse :TY_SIZE
  },
  /** 是否多选 */
  multiple:{
    type: Boolean,
    default: false
  },
  /** 是否可清空 */
  clearable: {
    type: Boolean,
    default: true
  },
  /** 是否禁用 */
  disabled: {
    type: Boolean,
    default: false
  },
  /** 是否只读 */
  readonly: {
    type: Boolean,
    default: false
  },
  /** 当前选中值（v-model绑定） */
  modelValue: {
    type: [String, Number,Array],
    required: true,
  },
  /** 占位文本 */
  placeholder:{
    type: String,
    default: ''
  },
  /** 图标 */
  icon:{
    type:String,
    default:'ty-arrow-down-s-line'
  },
  /** 宽度 */
  width:{
    type:String,
    default:'100%'
  }
})

export const groupProps ={
  /** 分组标题 */
  title:{
    type:String,
    default:''
  }
}
export const selEmits =['blur', 'input', 'update:modelValue']


export const opNm =useNmSpace('option')

export const opProps =buildProps({
  /** 选项标签 */
  label: {
    type: String,
    default: ''
  },
  /** 选项值 */
  value:{
    type: String,
    default: ''
  },
  /** 是否禁用 */
  disabled:{
    type:Boolean,
    default:false
  }
})

export const opEmits =['update:modelValue']