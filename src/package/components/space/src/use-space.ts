import { h, useSlots, type VNode } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { useProps } from './context'
import { type UseSpaceReturn } from './type'

/**
 * Space 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @returns {UseSpaceReturn} 返回子元素生成函数和容器样式
 */
export default function useSpace(
  props: ExtractPropTypes<typeof useProps>
): UseSpaceReturn {
  const slots = useSlots()
  const defaultSlot = slots.default ? slots.default() : []
  const splitSlot = slots.split ? slots.split() : null

  const sizeValue: Record<string, string> = {
    mini: '4px',
    small: '8px',
    medium: '12px',
    large: '16px'
  }

  const getMarginKey = () => props.direction === 'row' ? 'marginRight' : 'marginBottom'
  const getMarginValue = () => sizeValue[String(props.size)] || `${props.size}px`

  const generateChild = (child: VNode, index: number, length: number): VNode =>
    h('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        [getMarginKey()]: index < length - 1 ? getMarginValue() : '0px'
      }
    }, child)

  const generateSplit = (): VNode | null => {
    if (!splitSlot || !splitSlot.length) return null
    return h('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        [getMarginKey()]: getMarginValue()
      }
    }, splitSlot)
  }

  const getChildren = (): VNode[] => {
    const children: VNode[] = []
    defaultSlot.forEach((item: VNode, index: number) => {
      if (Array.isArray(item.children)) {
        item.children.forEach((child: VNode, childIndex: number) => {
          children.push(generateChild(child, childIndex, item.children.length))
          if (splitSlot && childIndex < item.children.length - 1) {
            children.push(generateSplit()!)
          }
        })
      } else {
        children.push(generateChild(item, index, defaultSlot.length))
      }

      if (splitSlot && index < defaultSlot.length - 1) {
        children.push(generateSplit()!)
      }
    })
    return children
  }

  const containerStyle: Record<string, string> = {
    display: props.direction === 'row' ? 'inline-flex' : 'flex',
    alignItems: props.align,
    justifyContent: props.justify,
    flexDirection: props.direction,
    width: '100%'
  }

  return {
    getChildren,
    containerStyle
  }
}
