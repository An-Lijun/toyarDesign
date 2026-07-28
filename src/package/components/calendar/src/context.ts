import { createComponentContext } from '@/package/utils/createComponentContext'


export const { staticProps, useProps, nm, useEmits } = createComponentContext({
  name: 'calendar',
  props: {
    /** 日期项高度 */
    dayItemHeight: {
      type: Number,
      default: 110
    }
  },
  emits: {
    /** 日期项点击时触发 */
    'click': (value: Date) => value,
  }
})
