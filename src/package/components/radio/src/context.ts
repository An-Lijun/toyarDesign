import useNmSpace from "../../../../package/hooks/useBem"

export const radioGroupProps ={
  size: {
    type: String,
    validator: (value:string) => {
      return ['mini', 'small', 'medium', 'large'].includes(value)
    }
  },
  modelValue: {
    type: [String, Number],
    required: true,
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
export const radioEmits =['update:modelValue','change']

export const nm =useNmSpace('radio')