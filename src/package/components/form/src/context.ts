import buildProps from "../../../utils/buildProps"
import useNmSpace from "../../../hooks/useBem"

export const formProps =buildProps({
  formData: Object,
  rules: {
    type: Object,
    default: () => ({})
  },
  labelWidth:{
    type: String,
    default:'100'
  },
  labelPosition: String,
  size: String,
  disabled: Boolean,
  readonly: Boolean,
  layout:{
    type: String,
    default:'inline',
    values:['vertical','inline']
  }
})
export const nm =useNmSpace('form')

export type FormProps = typeof formProps