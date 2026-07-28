import { ref, unref, nextTick, onMounted, onUnmounted } from 'vue'
import { createPopper } from '@popperjs/core'
import type { UsePopconfirmReturn } from './type'

export default function usePopconfirm(
  props: Record<string, any>,
  emit: (e: string, ...args: any[]) => void
): UsePopconfirmReturn {
  const isShowConfirm = ref(false)
  let popperInstance: any = null
  const popRef = ref()
  const arrowRef = ref()
  const containerRef = ref()

  const handleReslove = () => {
    isShowConfirm.value = false
    emit('confirm')
  }

  const handleReject = () => {
    isShowConfirm.value = false
    emit('reject')
  }

  const createInstance = () => {
    popperInstance = createPopper(unref(containerRef), unref(popRef), {
      placement: props.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 25]
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

  const handleShow = () => {
    isShowConfirm.value = true
    createInstance()
  }

  const closePopconfirm = () => {
    isShowConfirm.value = false
  }

  onMounted(() => {
    document.addEventListener('click', closePopconfirm)
  })

  onUnmounted(() => {
    document.removeEventListener('click', closePopconfirm)
  })

  return {
    isShowConfirm,
    popRef,
    arrowRef,
    containerRef,
    handleReslove,
    handleReject,
    handleShow
  }
}
