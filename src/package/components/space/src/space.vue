<!-- setup 语法糖不支持render 语法 -->

<script>
// 帮我使用render写一个space 组件

import { h, defineComponent, toRefs, watchEffect, useSlots } from 'vue'
import { TY_SIZE } from '../../../constant';
export default defineComponent({
  name: 'TySpace',
  props: {
    align: {
      type: String,
      validator: (value) => ['start', 'end', 'center', 'baseline'].includes(value),
      default: 'center'
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

    // 帮我获取default 插槽 内容
    const slots = useSlots()
    const defaultSlot = slots.default ? slots.default() : []

    const sizeValue = {
      "mini": '4px',
      "small": '8px',
      "medium":'12px',
      'large': '16px',
    }
    return () =>
      h('div', {
        style: {
          display: 'inline-flex',
          alignItems: 'center',
          flexDirection:props.direction
        }
      }, defaultSlot.map(item => h('div', {
        style: {
          display: 'flex',
          alignItems: 'center',
          [`${ props.direction==='row'? 'marginRight':'marginBottom'}`]: sizeValue[props.size]
        }
      }, item)))
  }
})
</script>
k