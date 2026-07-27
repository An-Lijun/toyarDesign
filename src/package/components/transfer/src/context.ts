import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'transfer',
  props: {
    /** 源数据 */
    data: {
      type: Array,
      required: true
    }
  },
  emits: {}
})
