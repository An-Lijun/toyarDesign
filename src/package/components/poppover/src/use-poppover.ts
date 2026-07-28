import { ref, unref, nextTick, onUnmounted, computed } from 'vue'
import { createPopper } from '@popperjs/core'
import type { UsePoppoverReturn } from './type'

export default function usePoppover(props: Record<string, any>): UsePoppoverReturn {
  let popperInstance: any = null
  const popRef = ref()
  const arrowRef = ref()
  const containerRef = ref()
  const defaultSlot = ref()

  let eventMaps = ref<Record<string, any>>({})
  let isShowConfirm = ref(false)
  let now = false

  const handleClick = () => {
    setTimeout(() => {
      isShowConfirm.value = !isShowConfirm.value
      createInstance()
    })
  }

  const handleEnter = () => {
    createInstance()
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

  const createInstance = () => {
    popperInstance = createPopper(unref(containerRef), unref(popRef), {
      placement: props.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 10]
          }
        },
        {
          name: 'arrow',
          options: {
            element: unref(arrowRef),
          }
        }
      ]
    })
    nextTick(() => {
      popperInstance.update()
    })
  }

  return {
    popRef,
    arrowRef,
    containerRef,
    defaultSlot,
    eventMaps,
    isShowConfirm
  }
}
