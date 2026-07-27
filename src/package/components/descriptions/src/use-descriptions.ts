import type { ExtractPropTypes } from 'vue'
import { useProps } from './context'
import { type UseDescriptionsReturn } from './type'

/**
 * 将数组按指定大小分割成二维数组
 * @param array - 原始数组
 * @param size - 每个子数组的大小
 * @returns 分割后的二维数组
 */
const getChunkArray = (
  array: Array<any>,
  size: number = 1
): Array<Array<any>> => {
  if (!Array.isArray(array)) {
    throw new TypeError('params is not a array')
  }
  let newArr: Array<any> = []
  array.forEach((element, index) => {
    if (index % size === 0) {
      return newArr.push([element])
    }
    return newArr.at(-1).push(element)
  })
  return newArr
}

/**
 * Descriptions 组件的核心逻辑 Hook
 * @param props - 组件属性
 * @returns {UseDescriptionsReturn} 返回处理后的数据
 */
export default function useDescriptions(
  props: ExtractPropTypes<typeof useProps>
): UseDescriptionsReturn {
  const relData = getChunkArray(props.data || [], props.column)

  return {
    relData
  }
}
