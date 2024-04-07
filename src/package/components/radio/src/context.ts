import useNmSpace from "../../../../package/hooks/useBem"

export const radioProps ={
  size: {
    type: String,
    default: 'small',
    validator: (value:string) => {
      return ['mini', 'small', 'medium', 'large'].includes(value)
    }
  },
  modelValue: {
    type: [String, Number],
    required: true,
    default: ''
  },
  value: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  }
}
export const radioEmits =['update:modelValue']

export const nm =useNmSpace('radio')