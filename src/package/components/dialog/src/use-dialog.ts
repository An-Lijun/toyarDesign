import { ref, onMounted } from 'vue'
import type { UseDialogReturn } from './type'

/**
 * Dialog 组件的核心逻辑 Hook
 * @param model - v-model 引用
 * @returns {UseDialogReturn} 返回对话框相关状态和方法
 */
export default function useDialog(model: { value: boolean }): UseDialogReturn {
  const showValue = ref(false)
  const tyDialogHeader = ref()
  const tyDialog = ref()

  const handleClose = () => {
    model.value = false
  }

  const initDrag = () => {
    let x = 0
    let y = 0
    const moveDialog = (e: MouseEvent) => {
      tyDialog.value.style.margin = 0
      let moveX = e.pageX - x
      let moveY = e.pageY - y
      tyDialog.value.style.left = moveX + 'px'
      tyDialog.value.style.top = moveY + 'px'
    }

    tyDialogHeader.value.addEventListener('mousedown', (e: MouseEvent) => {
      x = e.pageX - tyDialog.value.offsetLeft
      y = e.pageY - tyDialog.value.offsetTop
      if (document) {
        document?.addEventListener('mousemove', moveDialog)
      }
    })

    tyDialogHeader.value.addEventListener('mouseup', () => {
      if (document) {
        document?.removeEventListener('mousemove', moveDialog)
      }
    })
  }

  onMounted(() => {
    initDrag()
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
