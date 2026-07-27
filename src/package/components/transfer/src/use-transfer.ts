import { ref, computed } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { useProps } from './context'
import { type UseTransferReturn, type TransferItem } from './type'

/**
 * Transfer 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @param model - 双向绑定的 modelValue
 * @returns {UseTransferReturn} 返回穿梭框相关状态和方法
 */
export default function useTransfer(
  props: ExtractPropTypes<typeof useProps>,
  model: { value: TransferItem[] }
): UseTransferReturn {
  const data = ref<TransferItem[]>(Array.isArray(props.data) ? props.data : [])

  const leftCheck = ref<(string | number)[]>([])
  const rightCheck = ref<(string | number)[]>([])

  const leftDisabled = ref(false)
  const rightDiabeld = ref(false)

  const handleToRight = () => {
    const selectedItems = data.value.filter(item => leftCheck.value.includes(item.value))
    data.value = data.value.filter(item => !leftCheck.value.includes(item.value))
    model.value.push(...selectedItems)
    leftCheck.value = []
    rightDiabeld.value = false
  }

  const handleToLeft = () => {
    const selectedItems = model.value.filter(item => rightCheck.value.includes(item.value))
    model.value = model.value.filter(item => !rightCheck.value.includes(item.value))
    data.value.push(...selectedItems)
    rightCheck.value = []
    leftDisabled.value = false
  }

  const handleLfChange = (val: (string | number)[]) => {
    if (val.length) {
      rightDiabeld.value = true
    } else {
      rightDiabeld.value = false
    }
  }

  const handleRtChange = (val: (string | number)[]) => {
    if (val.length) {
      leftDisabled.value = true
    } else {
      leftDisabled.value = false
    }
  }

  const handleLfAllChange = (val: (string | number)[]) => {
    if (val.length) {
      leftCheck.value = data.value.map(item => item.value)
      rightDiabeld.value = true
    } else {
      leftCheck.value = []
      rightDiabeld.value = false
    }
  }

  const handleRtAllChange = (val: (string | number)[]) => {
    if (val.length) {
      rightCheck.value = model.value.map(item => item.value)
      leftDisabled.value = true
    } else {
      rightCheck.value = []
      leftDisabled.value = false
    }
  }

  const computeHalfState = (
    total: TransferItem[],
    checked: Ref<(string | number)[]>,
    disabled: Ref<boolean>,
    allCheck: Ref<(string | number)[]>
  ) => {
    if (disabled.value) {
      allCheck.value = []
      return false
    }
    const isFullChecked = total.length === checked.value.length
    if (checked.value.length) {
      allCheck.value = [1]
    }
    if (isFullChecked) {
      allCheck.value = [1]
    }
    if (!checked.value.length) {
      allCheck.value = []
    }
    return !isFullChecked
  }

  const leftAllCheck = ref<(string | number)[]>([])
  const leftHarf = computed(() =>
    computeHalfState(data.value, leftCheck, leftDisabled, leftAllCheck)
  )

  const rightAllCheck = ref<(string | number)[]>([])
  const rightHarf = computed(() =>
    computeHalfState(model.value, rightCheck, rightDiabeld, rightAllCheck)
  )

  return {
    data,
    leftCheck,
    rightCheck,
    leftDisabled,
    rightDiabeld,
    leftAllCheck,
    rightAllCheck,
    leftHarf,
    rightHarf,
    handleToRight,
    handleToLeft,
    handleLfChange,
    handleRtChange,
    handleLfAllChange,
    handleRtAllChange
  }
}
