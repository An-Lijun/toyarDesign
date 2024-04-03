import useNmSpace from "../../../../package/hooks/useBem"

export const inputProps={
  size: {
    type: String,
    default: 'small',
    validator: (value:string) => {
      return ['mini', 'small', 'medium', 'large'].includes(value)
    }
  },
  clearable: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [ Number,String],
    required: true,
    default: ''
  }
}


export const nm = useNmSpace('password')