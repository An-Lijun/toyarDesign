import useNmSpace from "../../../../package/hooks/useBem"

export const radioProps ={
  size: {
    type: String,
    default: 'small',
    validator: value => {
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
  }
}
export const radioEmits =['update:modelValue']

export const nm =useNmSpace('radio')