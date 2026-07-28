import { ref } from 'vue'
import { formatDate } from 'robinson'
import type { UseCalendarReturn } from './type'

const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

/**
 * Calendar 组件的核心逻辑 Hook
 * @param emit - 事件发射器
 * @returns {UseCalendarReturn} 返回日历相关状态和方法
 */
export default function useCalendar(
  emit: (e: 'click', value: string) => void
): UseCalendarReturn {
  const countDate = [new Date().getFullYear(), new Date().getMonth()]
  let nowDate = ref('')
  let nowMonthStr = ref('')
  let befMonth = ref<Array<number>>([])
  let nowMonth = ref(0)
  let aftMonth = ref(0)

  let nowDateStr = formatDate(new Date())

  const padZero = (num: number) => {
    return String(num).padStart(2, '0')
  }

  const render = (dateArr: Array<any>) => {
    let date = new Date(dateArr[0], dateArr[1])
    let year = date.getFullYear()
    let month = date.getMonth()

    nowDate.value = `${dateArr[0]}年 ${dateArr[1] + 1}月`
    nowMonthStr.value = `${dateArr[0]}-${padZero(dateArr[1] + 1)}`

    befMonth.value = []
    let flag = true
    let index = 0
    while (flag) {
      let lastDay = new Date(year, month, index)
      befMonth.value.unshift(lastDay.getDate())
      index--
      if (lastDay.getDay() == 0) {
        flag = false
      }
    }

    nowMonth.value = new Date(year, month + 1, 0).getDate()
    aftMonth.value = 42 - befMonth.value.length - nowMonth.value
  }

  render(countDate)

  const lastYear = () => {
    countDate[0] = countDate[0] - 1
    render(countDate)
  }

  const goTday = () => {
    render([new Date().getFullYear(), new Date().getMonth()])
  }

  const lastMonth = () => {
    if (countDate[1] === 0) {
      countDate[0] = countDate[0] - 1
      countDate[1] = 11
    } else {
      countDate[1] = countDate[1] - 1
    }
    render(countDate)
  }

  const nextMonth = () => {
    if (countDate[1] === 11) {
      countDate[0] = countDate[0] + 1
      countDate[1] = 0
    } else {
      countDate[1] = countDate[1] + 1
    }
    render(countDate)
  }

  const nextYear = () => {
    countDate[0] = countDate[0] + 1
    render(countDate)
  }

  const selectDay = (dayItem: number) => {
    let data = `${countDate[0]}-${String(countDate[1] + 1).padStart(
      2,
      '0'
    )}-${String(dayItem).padStart(2, '0')}`
    emit('click', data)
  }

  const getNowDate = () => nowDate.value

  return {
    nowDate,
    nowMonthStr,
    befMonth,
    nowMonth,
    aftMonth,
    weekArr,
    nowDateStr,
    padZero,
    lastYear,
    lastMonth,
    nextMonth,
    nextYear,
    goTday,
    selectDay,
    getNowDate
  }
}
