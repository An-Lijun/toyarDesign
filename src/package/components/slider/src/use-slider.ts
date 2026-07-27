import { onMounted, ref } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { useProps } from './context'
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import { type UseSliderReturn } from './type'

/**
 * Slider 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @param emit - 事件发射器
 * @returns {UseSliderReturn} 返回滑块相关状态和方法
 */
export default function useSlider(
  props: ExtractPropTypes<typeof useProps>,
  emit: (e: 'update:modelValue', value: string | number) => void
): UseSliderReturn {
  const tyboll = ref<HTMLElement | null>(null)
  const sliderBox = ref<HTMLElement | null>(null)
  const minx = Number(props.max) - Number(props.min)
  const style = ref({
    height: props.width + 'px'
  })
  const bollStyle = ref({
    height: Number(props.width) * 2 + 'px',
    width: Number(props.width) * 2 + 'px'
  })

  let x = 0
  let maxWidth = 0

  const fn = () => {
    const fl = Number(model.value) / minx
    const moveX = fl * maxWidth
    tyboll.value?.style.setProperty('left', moveX + 'px')
  }

  const { model } = useCompMvalue(props, emit, {
    watchChange: fn
  })

  const move = (e: MouseEvent) => {
    let moveX = e.pageX - x
    moveX = moveX >= maxWidth ? maxWidth : moveX
    moveX = moveX <= 0 ? 0 : moveX
    const fl = moveX / maxWidth
    model.value = String(fl * minx)
    tyboll.value?.style.setProperty('left', moveX + 'px')
  }

  const slider = (e: MouseEvent) => {
    e.preventDefault()
    if (tyboll.value) {
      x = e.pageX - tyboll.value.offsetLeft
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', move)
      })
    }
  }

  onMounted(() => {
    if (sliderBox.value) {
      maxWidth = sliderBox.value.getBoundingClientRect().width
    }
  })

  return {
    model,
    style,
    bollStyle,
    sliderBox,
    tyboll,
    slider
  }
}
