import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'drawer',
  props: {
    /** 抽屉宽度 */
    width: { type: Number, default: 300 }
  },
  emits: []
})
