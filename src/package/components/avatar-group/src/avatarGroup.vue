<!-- setup 语法糖不支持render 语法 -->

<script>
import { h, defineComponent, useSlots } from 'vue'


export default defineComponent({
  name: 'TyAvatarGroup',
  setup(props) {
    // 帮我获取default 插槽 内容
    const slots = useSlots()
    const defaultSlot = slots.default ? slots.default() : []
    let len = defaultSlot.length

    const getChildren = () =>
      defaultSlot.map(item => h(item, {
        style: {
          zIndex: len--,
          marginLeft:'-8px',
          border:'2px solid #fff',
        }
      }))
    return () => h('div', {}, getChildren())
  }
})
</script>