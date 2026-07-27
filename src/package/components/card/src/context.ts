
import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'card',
  props: {
     border: {
    type: Boolean,
    default: true
  },
  shadow: {
    type: String,
    default: 'none'
  },
  isLoading:{
    type: Boolean,
    default:false
  }
  },
  emits: {
  }
})

