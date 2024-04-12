import useNmSpace from '../../../hooks/useBem'

export const calendarProp={
  size: {
    type: String,
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
  },
  format:{
    type:String,
  },
}
export const calendarEmit =['blur', 'input', 'update:modelValue']

export const nm = useNmSpace('calendar')
 