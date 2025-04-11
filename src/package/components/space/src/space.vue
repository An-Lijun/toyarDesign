<script>
import { h, defineComponent, useSlots } from 'vue'
import { TY_SIZE } from '../../../constant'

export default defineComponent({
  name: 'TySpace',
  props: {
    align: {
      type: String,
      validator: (value) => ['start', 'end', 'center', 'baseline'].includes(value),
      default: 'center'
    },
    justify: {
      type: String,
      validator: (value) => ['start', 'end', 'center', 'between', 'around', 'evenly'].includes(value),
      default: 'start'
    },
    direction: {
      type: String,
      validator: (value) => ['row', 'column'].includes(value),
      default: 'row'
    },
    size: {
      type: [Number, String],
      validator: (value) => TY_SIZE.includes(value),
      default: 'small'
    }
  },
  setup(props) {
    const slots = useSlots()
    const defaultSlot = slots.default ? slots.default() : []
    const splitSlot = slots.split ? slots.split() : null

    // 定义 sizeValue 并提供默认值
    const sizeValue = {
      mini: '4px',
      small: '8px',
      medium: '12px',
      large: '16px'
    }

    // 获取 marginKey 和 marginValue
    const getMarginKey = () => props.direction === 'row' ? 'marginRight' : 'marginBottom'
    const getMarginValue = () => sizeValue[props.size] || `${props.size}px`

    // 辅助函数：生成子元素
    const generateChild = (child, index, length) =>
      h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          [getMarginKey()]: index < length - 1 ? getMarginValue() : '0px'
        }
      }, child)

    // 辅助函数：生成分隔符
    const generateSplit = () => {
      if (!splitSlot || !splitSlot.length) return null
      return h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          [getMarginKey()]: getMarginValue()
        }
      }, splitSlot)
    }

    // 主逻辑：生成所有子元素
    const getChildren = () => {
      const children = []
      defaultSlot.forEach((item, index) => {
        if (Array.isArray(item.children)) {
          item.children.forEach((child, childIndex) => {
            children.push(generateChild(child, childIndex, item.children.length))
            if (splitSlot && childIndex < item.children.length - 1) {
              children.push(generateSplit())
            }
          })
        } else {
          children.push(generateChild(item, index, defaultSlot.length))
        }

        if (splitSlot && index < defaultSlot.length - 1) {
          children.push(generateSplit())
        }
      })
      return children
    }

    return () =>
      h('div', {
        style: {
          display: props.direction === 'row' ? 'inline-flex' : 'flex',
          alignItems: props.align,
          justifyContent: props.justify,
          flexDirection: props.direction,
          width: '100%'
        }
      }, getChildren())
  }
})
</script>