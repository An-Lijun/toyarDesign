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

    // 帮我获取default 插槽 内容
    const slots = useSlots()
    const defaultSlot = slots.default ? slots.default() : []
    const splitSlot = slots.split ? slots.split() : null


    const sizeValue = {
      "mini": '4px',
      "small": '8px',
      "medium": '1px',
      'large': 'px',
    }

    const getChildren = () => {

      let arr = []
      let len = defaultSlot.length - 1
      let marginKey = [`${props.direction === 'row' ? 'marginRight' : 'marginBottom'}`]
      let marginValue = sizeValue[props.size] || props.size + 'px'
      const genChild = (list) => {
        let len = list.length-1
        return list.map((item, index) => {
          arr.push(
            h('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                [marginKey]: marginValue
              }
            }, item)
          )

          if (splitSlot && index !== len) {
            arr.push(
              h('div', {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  [marginKey]: marginValue
                }
              }, splitSlot)
            )
          }

        })
      }

      defaultSlot.forEach((item, index) => {
        if (Array.isArray(item.children)) {
          genChild(item.children)
        } else {
          arr.push(
            h('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                [marginKey]: marginValue
              }
            }, item)
          )
        }


        if (splitSlot && index !== len) {
          arr.push(
            h('div', {
              style: {
                display: 'flex',
                alignItems: 'center',
                [marginKey]: marginValue
              }
            }, splitSlot)
          )
        }

      })

      return arr
    }
    return () =>
      h('div', {
        style: {
          display: props.direction === 'row'?'inline-flex':'',
          alignItems: props.align ,
          width:'100%',
          justifyContent: props.justify,
          flexDirection: props.direction
        }
      }, getChildren())
  }
})
</script>
k