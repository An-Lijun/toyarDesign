import { computed } from 'vue'
import type { ExtractPropTypes } from 'vue'
import { useProps } from './context'
import { type UsePaginationReturn } from './type'

/**
 * Pagination 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @param emit - 事件发射器
 * @returns {UsePaginationReturn} 返回分页相关状态和方法
 */
export default function usePagination(
  props: ExtractPropTypes<typeof useProps>,
  emit: (e: 'currentChange' | 'sizeChange', value: number) => void
): UsePaginationReturn {
  const current = Number(props.current)
  const total = Number(props.total)
  const pageSize = Number(props.pageSize)

  const items = computed(() => {
    const item = Math.floor(current / pageSize)
    let min = item * pageSize
    let max = (item + 1) * pageSize
    const arr: number[] = []
    const totalFloor = Math.floor(total / pageSize)

    if (current === min) {
      min = min - pageSize
      max = current
    }

    if (total <= max) {
      max = total
    }

    for (let i = min; i < max; i++) {
      arr.push(i + 1)
    }
    return arr
  })

  const preClick = () => {
    let cur = current
    if ((cur - pageSize) > 0) {
      cur -= pageSize
      emit('currentChange', cur)
    }
  }

  const aftClick = () => {
    let cur = current
    const sum = cur + pageSize

    if (sum < total) {
      cur = sum
      emit('currentChange', cur)
    }
    if (sum >= total) {
      cur = total
      emit('currentChange', cur)
    }
  }

  const itemClick = (item: number) => {
    emit('currentChange', item)
  }

  return {
    items,
    preClick,
    aftClick,
    itemClick
  }
}
