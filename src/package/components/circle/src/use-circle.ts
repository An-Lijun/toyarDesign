import { computed, ref, watch } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { useProps } from './context'
import { type UseCircleReturn } from './type'

/**
 * Circle 组件的核心逻辑 Hook
 * 计算圆的半径、SVG 路径和颜色
 * @param props - 组件属性
 * @returns {UseCircleReturn} 返回半径、路径和颜色
 */
export default function useCircle(
  props: ExtractPropTypes<typeof useProps>
): UseCircleReturn {
  const colors = ref('')

  const radius = computed(() => 50 - props.strokeWidth / 2)

  const pathString = computed(() => {
    return `M 50,50 m 0,-${radius.value}
          a ${radius.value},${radius.value} 0 1 1 0,${2 * radius.value}
          a ${radius.value},${radius.value} 0 1 1 0,-${2 * radius.value}`
  })

  const changeColor = () => {
    colors.value = props.strokeColor
    if (props.percent === 0) {
      colors.value = props.trailColor
    }
  }

  watch(() => props.percent, changeColor, { immediate: true })

  return {
    radius,
    pathString,
    colors
  }
}
