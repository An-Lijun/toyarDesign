import { ref, onMounted, onUnmounted } from 'vue'
import type { UseTriggerReturn } from './type'

export default function useTrigger(props: Record<string, any>): UseTriggerReturn {
  const defaultSlot = ref()
  let eventMaps = ref<Record<string, any>>({})
  let isShowConfirm = ref(false)
  let now = false

  const handleClick = () => {
    setTimeout(() => {
      isShowConfirm.value = !isShowConfirm.value
    })
  }

  const handleEnter = () => {
    isShowConfirm.value = true
    now = true
  }

  const handleLeave = () => {
    now = false
    setTimeout(() => {
      if (!now) {
        isShowConfirm.value = false
      }
    }, 150)
  }

  const clickFn = () => {
    isShowConfirm.value = false
  }

  window.addEventListener('click', clickFn)

  onUnmounted(() => {
    window.removeEventListener('click', clickFn)
  })

  switch (props.trigger) {
    case 'click':
      eventMaps.value = {
        click: handleClick
      }
      break
    case 'hover':
      eventMaps.value = {
        mouseenter: handleEnter,
        mouseleave: handleLeave
      }
      break
    default:
      eventMaps.value = {
        click: handleClick
      }
  }

  let style = ref('')

  onMounted(() => {
    let { width, height } = getComputedStyle(defaultSlot.value)
    width = width.slice(0, -2)
    height = height.slice(0, -2)

    const getPlacement = () => {
      switch (props.placement) {
        case 'tl':
          return {
            top: '0',
            left: '50%',
            transform: `translate(calc(0% - ${width / 2}px), calc(-100% - 15px))`,
            '--ui-width': width + 'px',
            '--ui-height': width + 'px',
          }
        case 'top':
          return {
            top: '0',
            left: '50%',
            transform: 'translate(-50%, calc(-100% - 15px))'
          }
        case 'tr':
          return {
            top: '0',
            right: '0%',
            transform: `translate(calc(0%), calc(-100% - 15px))`
          }
        case 'bl':
          return {
            top: '0',
            left: '50%',
            transform: `translate(calc(0% - ${width / 2}px),  calc(50% + 5px))`,
            '--ui-width': width + 'px',
            '--ui-height': width + 'px',
          }
        case 'bottom':
          return {
            top: '0',
            left: '50%',
            transform: 'translate(-50%, calc(50% + 5px))'
          }
        case 'br':
          return {
            top: '0',
            right: '0%',
            transform: `translate(0% , calc(50% + 5px))`,
            '--ui-width': width + 'px',
            '--ui-height': width + 'px',
          }
      }
    }
    style.value = getPlacement() as any
  })

  return {
    defaultSlot,
    eventMaps,
    isShowConfirm,
    style
  }
}
