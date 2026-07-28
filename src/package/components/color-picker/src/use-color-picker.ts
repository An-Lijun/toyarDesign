import { ref, onMounted, onUnmounted, nextTick, unref } from 'vue'
import Draggable from '../../../utils/draggable'
import { rgbToHsv, hsvToRgb, transformColorFormat } from './color.js'
import { createPopper } from '@popperjs/core'
import type { UseColorPickerReturn } from './type'

/**
 * ColorPicker 组件的核心逻辑 Hook
 * @param emit - 事件发射器
 * @returns {UseColorPickerReturn} 返回颜色选择器相关状态和方法
 */
export default function useColorPicker(
  emit: (e: 'change' | 'update:modelValue', value: string) => void
): UseColorPickerReturn {
  const wrapRef = ref(null)
  const wrapDraggerRef = ref(null)
  const hueDraggerRef = ref(null)
  const alphaDraggerRef = ref(null)
  const alphaRef = ref(null)
  const containerRef = ref(null)
  const popRef = ref(null)
  const isShowColor = ref(false)
  let popperInstance: any = null
  let containerHeight: number, containerWidth: number
  let isMounted = false

  const initColor = {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  }
  let color = ref({
    ...initColor,
    ...rgbToHsv(initColor)
  })
  let colorFormat = ref({
    ...transformColorFormat(color.value)
  })

  const createInstance = () => {
    popperInstance = createPopper(unref(containerRef), unref(popRef), {
      placement: 'bottom',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [355, 355]
          }
        }
      ]
    })
    nextTick(() => {
      popperInstance.update()
    })
  }

  function handleChangeSaturationValue(dx: number, dy: number) {
    const s = (100 * dx) / containerWidth
    const v = 100 * (1 - dy / containerHeight)
    const rgb = hsvToRgb({
      h: color.value.h,
      s,
      v
    })
    const colorResult = {
      ...color.value,
      ...rgb,
      s,
      v
    }
    color.value = colorResult
    colorFormat.value = transformColorFormat(colorResult)
    emit('change', colorFormat.value.hexColor)
    emit('update:modelValue', colorFormat.value.hexColor)
  }

  function handleChangeHue(dx: number) {
    const h = (dx / containerWidth) * 360
    const rgb = hsvToRgb({
      h,
      s: color.value.s,
      v: color.value.v
    })
    const colorResult = {
      ...color.value,
      ...rgb,
      h
    }
    color.value = colorResult
    colorFormat.value = transformColorFormat(colorResult)
    emit('change', colorFormat.value.hexColor)
    emit('update:modelValue', colorFormat.value.hexColor)
  }

  function handleChangeAlpha(dx: number) {
    const a = dx / containerWidth
    const colorResult = {
      ...color.value,
      a
    }
    color.value = colorResult
    colorFormat.value = transformColorFormat(colorResult)
    emit('change', colorFormat.value.hexColor)
    emit('update:modelValue', colorFormat.value.hexColor)
  }

  function updatePageView(dx?: number) {
    wrapRef.value.style.backgroundColor = colorFormat.value.hslColor
    alphaRef.value.style.background = `linear-gradient(to right, rgb(${color.value.r} ${color.value.g} ${color.value.b} / 0), rgb(${color.value.r} ${color.value.g} ${color.value.b} / 1)) top left / 100% 100%,conic-gradient(
      #666 0.25turn,
      #999 0.25turn 0.5turn,
      #666 0.5turn 0.75turn,
      #999 0.75turn ) top left / 16px 16px repeat`
  }

  function addDraggable() {
    const draggableInstance = new Draggable(wrapDraggerRef.value)
    const { width, height } = wrapRef.value.getBoundingClientRect()
    containerWidth = width
    containerHeight = height
    draggableInstance.on('mousemove', ({ dx, dy }) => {
      handleChangeSaturationValue(dx, dy)
      wrapDraggerRef.value.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
      updatePageView()
    })

    const draggableHueInstance = new Draggable(hueDraggerRef.value)
    draggableHueInstance.on('mousemove', ({ dx }) => {
      handleChangeHue(dx)
      hueDraggerRef.value.style.transform = `translate(${dx}px, 0)`
      updatePageView()
    })

    const draggableAlphaInstance = new Draggable(alphaDraggerRef.value)
    draggableAlphaInstance.on('mousemove', ({ dx }) => {
      handleChangeAlpha(dx)
      alphaDraggerRef.value.style.transform = `translate(${dx}px, 0)`
      updatePageView(dx)
    })
  }

  const handleClick = (e: Event) => {
    e.stopPropagation()
    isShowColor.value = true
    if (!isMounted) {
      nextTick(() => {
        addDraggable()
      })
      isMounted = true
    }
  }

  const close = () => {
    isShowColor.value = false
  }

  const initPopper = () => {
    createInstance()
  }

  onMounted(() => {
    window.addEventListener('click', close)
  })

  onUnmounted(() => {
    window.removeEventListener('click', close)
    if (popperInstance) {
      popperInstance.destroy()
    }
  })

  return {
    wrapRef,
    wrapDraggerRef,
    hueDraggerRef,
    alphaDraggerRef,
    alphaRef,
    containerRef,
    popRef,
    isShowColor,
    color,
    colorFormat,
    handleClick,
    close,
    initPopper
  }
}
