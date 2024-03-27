import useNmSpace from '../../../hooks/useBem'

export const calendarProp={
  size: {
    type: String,
    default: 'small',
    validator:( value:string) => {
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
    type: String,
    required: true,
    default: ''
  }
}
export const calendarEmit =['blur', 'input', 'update:modelValue']

export const nm = useNmSpace('calendar')
 