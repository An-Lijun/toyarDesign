import { createComponentContext } from '@/package/utils/createComponentContext'

export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'pagination',
  props: {
    /** 当前页码 */
    current: {
      type: [String, Number],
      required: true,
      default: '1'
    },
    /** 总条数 */
    total: {
      type: [String, Number],
      required: true,
      default: ''
    },
    /** 每页条数 */
    pageSize: {
      type: [String, Number],
      required: true,
      default: '5'
    }
  },
  emits: {
    /** 当前页改变 */
    currentChange: (value: number) => true,
    /** 每页条数改变 */
    sizeChange: (value: number) => true
  }
})
