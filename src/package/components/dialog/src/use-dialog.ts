import { ref, onMounted, onBeforeUnmount, watch, nextTick, type Ref, type ExtractPropTypes } from 'vue'
import type { UseDialogReturn } from './type'
import { useProps } from './context'

// body 滚动锁定计数器，支持嵌套弹窗
let scrollLockCount = 0
let originalBodyOverflow = ''

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
  let isScrollLocked = false

  const handleClose = () => {
    props.beforeClose?.(() => {
      model.value = false
    })
  }

  const handleMaskClick = () => {
    if (props.maskClosable) {
      handleClose()
    }
  }

  const handleEsc = (e: KeyboardEvent) => {
    if (props.closeOnEsc && (model.value || showValue.value) && (e.key === 'Escape' || e.keyCode === 27)) {
      handleClose()
    }
  }

  const lockScroll = () => {
    if (isScrollLocked) return
    if (scrollLockCount === 0) {
      originalBodyOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    scrollLockCount++
    isScrollLocked = true
  }

  const unlockScroll = () => {
    if (!isScrollLocked) return
    scrollLockCount = Math.max(0, scrollLockCount - 1)
    if (scrollLockCount === 0) {
      document.body.style.overflow = originalBodyOverflow
    }
    isScrollLocked = false
  }

  let x = 0
  let y = 0

  const moveDialog = (e: MouseEvent) => {
    tyDialog.value.style.margin = 0
    const moveX = e.pageX - x
    const moveY = e.pageY - y
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
    document.addEventListener('keydown', handleEsc)
  })

  // destroyOnClose 模式下，内层 DOM 销毁后 ref 失效，重新打开时需重新绑定拖拽
  watch(
    () => model.value || showValue.value,
    async visible => {
      if (props.isScrollLock && visible) {
        lockScroll()
      } else if (!visible) {
        unlockScroll()
      }
      if (props.destroyOnClose && props.draggable && visible) {
        await nextTick()
        initDrag()
      }
    }
  )

  onBeforeUnmount(() => {
    destroyDrag()
    document.removeEventListener('keydown', handleEsc)
    unlockScroll()
  })

  return {
    showValue,
    tyDialogHeader,
    tyDialog,
    model,
    handleClose,
    handleMaskClick,
    initDrag
  }
}
