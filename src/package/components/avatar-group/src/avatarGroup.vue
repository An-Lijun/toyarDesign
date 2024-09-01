<!-- setup 语法糖不支持render 语法 -->

<script>
import { h, defineComponent, useSlots } from 'vue'

export default defineComponent({
  name: 'TyAvatarGroup',
  props: {
    offset: {
      type: Number,
      default: 8
    }
  },
  setup(props) {
    // 帮我获取default 插槽 内容
    const slots = useSlots()
    const defaultSlot = slots.default ? slots.default() : []
    let len = defaultSlot.length

    const getChildren = () =>
      defaultSlot.map(item => h(item, {
        style: {
          zIndex: len--,
          marginLeft: `-${props.offset}px`,
          border: '2px solid var(--color-bg-1)',
        }
      }))
    return () => h('div', {}, getChildren())
  }
})
</script>