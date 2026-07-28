import { ref, onMounted, onBeforeUnmount, type Ref, type ExtractPropTypes } from 'vue'
import type { UseDialogReturn } from './type'
import { useProps } from './context'

/**
 * Dialog 组件的核心逻辑 Hook
 * @param model - v-model 引用
 * @param props - 组件 props
 * @returns {UseDialogReturn} 返回对话框相关状态和方法
 */
export default function useDialog(model: Ref<boolean>, props: ExtractPropTypes<typeof useProps>): UseDialogReturn {
  const showValue = ref(false)
  const tyDialogHeader = ref()
  const tyDialog = ref()

  const handleClose = () => {
    model.value = false
  }

  let x = 0
  let y = 0

  const moveDialog = (e: MouseEvent) => {
    tyDialog.value.style.margin = 0
    let moveX = e.pageX - x
    let moveY = e.pageY - y
    tyDialog.value.style.left = moveX + 'px'
    tyDialog.value.style.top = moveY + 'px'
  }

  const handleMouseDown = (e: MouseEvent) => {
    x = e.pageX - tyDialog.value.offsetLeft
    y = e.pageY - tyDialog.value.offsetTop
    document?.addEventListener('mousemove', moveDialog)
    document?.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseUp = () => {
    document?.removeEventListener('mousemove', moveDialog)
    document?.removeEventListener('mouseup', handleMouseUp)
  }

  const initDrag = () => {
    tyDialogHeader.value?.addEventListener('mousedown', handleMouseDown)
  }

  const destroyDrag = () => {
    tyDialogHeader.value?.removeEventListener('mousedown', handleMouseDown)
    document?.removeEventListener('mousemove', moveDialog)
    document?.removeEventListener('mouseup', handleMouseUp)
  }

  onMounted(() => {
    if (props.draggable) {
      initDrag()
    }
  })

  onBeforeUnmount(() => {
    destroyDrag()
  })

  return {
    showValue,
    tyDialogHeader,
    tyDialog,
    model,
    handleClose,
    initDrag
  }
}
