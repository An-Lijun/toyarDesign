import { ref, onMounted, nextTick } from 'vue'
import { TyiInformationFill, TyiCheckboxCircleFill, TyiCloseCircleFill } from 'toyaricon'
import type { UseNotificationReturn } from './type'

export const colorObj = {
  info: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'danger'
}

export const msgIconObj = {
  info: TyiInformationFill,
  success: TyiCheckboxCircleFill,
  warning: TyiInformationFill,
  error: TyiCloseCircleFill
}

/**
 * Notification 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @param emit - 事件发射器
 * @returns {UseNotificationReturn} 返回通知组件相关状态和方法
 */
export default function useNotification(
  props: {
    top: string
    time: string
  },
  emit: (e: 'close') => void
): UseNotificationReturn {
  let topValue = ref<number | string>(props.top)
  const visible = ref(false)
  const notificationRef = ref<HTMLElement>()
  const height = ref(0)

  const getCompHeight = () => {
    if (notificationRef.value) {
      height.value = notificationRef.value.getBoundingClientRect().height
    }
  }

  const timmer = setTimeout(() => {
    close()
  }, Number(props.time))

  const close = () => {
    if (timmer) {
      clearTimeout(timmer)
    }
    visible.value = false
    const smTimmer = setTimeout(() => {
      emit('close')
      clearTimeout(smTimmer)
    }, 500)
  }

  const floatNoti = (value: number) => {
    topValue.value = (typeof topValue.value === 'number' ? topValue.value : 0) - value
  }

  onMounted(() => {
    visible.value = true
    nextTick(() => {
      getCompHeight()
    })
  })

  return {
    topValue,
    visible,
    notificationRef,
    height,
    getCompHeight,
    close,
    floatNoti
  }
}
