import useNmSpace from '../../../hooks/useBem';

export const transProps ={
  modelValue: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
}

export const transEmits =['update:modelValue']

export const nm = useNmSpace('transfer')