<script>
import { h, defineComponent, useSlots, watchEffect } from 'vue'

export default defineComponent({
  name: 'TyAvatarGroup',
  props: {
    offset: {
      type: Number,
      default: 8
    }
  },
  setup(props) {
    const slots = useSlots()

    // 动态获取插槽内容并处理
    const getChildren = () => {
      const defaultSlot = slots.default?.() || []
      if (defaultSlot.length === 0) {
        console.warn('TyAvatarGroup: No children found in default slot.')
        return []
      }

      return defaultSlot.map((item, index) => {
        const zIndex = defaultSlot.length - index
        return h(item, {
          style: {
            zIndex: zIndex.toString(),
            marginLeft: `-${props.offset}px`,
            border: '2px solid var(--color-bg-1)',
          }
        })
      })
    }

    // 使用 watchEffect 确保在插槽内容或 props 变化时重新渲染
    let children = []
    watchEffect(() => {
      children = getChildren()
    })

    return () => h('div', {}, children)
  }
})
</script>