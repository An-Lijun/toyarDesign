import useNmSpace from "../../../../package/hooks/useBem"


export const prgProps={
  modelValue: {
    type: [String, Number],
    required: true,
    default: ''
  },
  strokeWidth: {
    type: String || Number,
    default: 5
  },
  isShowPer: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'line'
  },
  width: {
    type: String,
    default: 50
  }
}

export const prgEmits =['update:modelValue']

export const nm =useNmSpace('progress')