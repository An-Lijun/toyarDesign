import { buildProps } from "@/package/utils/buildProps"
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
})
export const nm =useNmSpace('form')