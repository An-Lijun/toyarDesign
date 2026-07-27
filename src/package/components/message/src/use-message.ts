import { ref, onMounted, nextTick } from 'vue'
import { TyiInformationFill, TyiCheckboxCircleFill, TyiCloseCircleFill } from 'toyaricon'
import type { UseMessageReturn } from './type'

export const msgIconObj = {
  info: TyiInformationFill,
  success: TyiCheckboxCircleFill,
  warning: TyiInformationFill,
  error: TyiCloseCircleFill
}

/**
 * Message 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @param emit - 事件发射器
 * @returns {UseMessageReturn} 返回消息组件相关状态和方法
 */
export default function useMessage(
  props: {
    options?: {
      type?: string
      time?: number
    }
    top: string
  },
  emit: (e: 'close') => void
): UseMessageReturn {
  const messageRef = ref<HTMLElement>()
  const visible = ref(false)
  let topValue = ref<number | string>(props.top)
  let height = ref(0)

  const type = msgIconObj.hasOwnProperty(props.options?.type)
    ? props.options?.type
    : 'info'

  const timmer = setTimeout(() => {
    close()
  }, props.options?.time)

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

  const getCompHeight = () => {
    if (messageRef.value) {
      height.value = messageRef.value.getBoundingClientRect().height
    }
  }

  const floatMsg = (value: number) => {
    topValue.value = (typeof topValue.value === 'number' ? topValue.value : 0) - value
  }

  onMounted(() => {
    visible.value = true
    nextTick(() => {
      getCompHeight()
    })
  })

  return {
    messageRef,
    visible,
    topValue,
    height,
    type,
    getCompHeight,
    close,
    floatMsg
  }
}
