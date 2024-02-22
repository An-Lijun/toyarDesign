
// inputProp

export const inputProps = {
  size: {
    type: String,
    default: 'small',
    validator: value => {
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
    type: [String, Number],
    required: true,
    default: ''
  },
  showLimit:{
    type:Boolean,
    default:false
  },
  format:{
    type:Function,
    default:value=> value
  },
  outPreText:{
    type:String
  },
  outAftText:{
    type:String
  }
}