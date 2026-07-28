import { ref, unref, nextTick, onMounted, onUnmounted } from 'vue'
import { createPopper } from '@popperjs/core'
import type { UseTooltipReturn } from './type'

export default function useTooltip(props: Record<string, any>): UseTooltipReturn {
  let eventMaps = ref<Record<string, any>>({})
  let isShowTip = ref(false)

  const popRef = ref()
  const arrowRef = ref()
  const containerRef = ref()
  let popperInstance: any = null

  const handleClick = (e: Event) => {
    e.stopPropagation()
    isShowTip.value = !isShowTip.value
    createInstance()
  }

  const handleEnter = () => {
    isShowTip.value = true
    createInstance()
  }

  const handleLeave = () => {
    isShowTip.value = false
  }

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

  const destroyPopper = () => {
    if (popperInstance) {
      popperInstance.destroy()
      popperInstance = null
    }
  }

  const createInstance = () => {
    popperInstance = createPopper(unref(containerRef), unref(popRef), {
      placement: props.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 5]
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

  const closeTooltip = () => {
    isShowTip.value = false
  }

  onMounted(() => {
    document.addEventListener('click', closeTooltip)
  })

  onUnmounted(() => {
    document.removeEventListener('click', closeTooltip)
    destroyPopper()
  })

  return {
    eventMaps,
    isShowTip,
    popRef,
    arrowRef,
    containerRef
  }
}
