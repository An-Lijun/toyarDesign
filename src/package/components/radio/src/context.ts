import useNmSpace from "../../../../package/hooks/useBem"

export const radioGroupProps ={
  size: {
    type: String,
    validator: (value:string) => {
      return ['mini', 'small', 'medium', 'large'].includes(value)
    }
  },
  modelValue: {
    required: true,
    type: [String, Number],
    default: ''
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
export const radioGroupEmits =['update:modelValue','change']

export const radioProps ={
  size: {
    type: String,
    validator: (value:string) => {
      return ['mini', 'small', 'medium', 'large'].includes(value)
    }
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  value: {
    type: [String,Number],
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
export const radioEmits =['update:modelValue','change']

export const nm =useNmSpace('radio')