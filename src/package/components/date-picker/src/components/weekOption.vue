<template>
  <header>
    <div :class="[nm.e('com')]">
      <div class="lastYear" @click="lastYear">
        <TyiArrowLeftDoubleLine  />
      </div>
      <div class="lastMonth" @click="lastMonth">
        <TyiArrowLeftSLine />
      </div>
      <div class="nowDate">{{ nowDate }}</div>
      <div class="nextMonth" @click="nextMonth">
        <TyiArrowRightSLine />

      </div>
      <div class="nextYear" @click="nextYear">
        <TyiArrowRightDoubleLine />
      </div>
    </div>
    <div :class="[nm.e('week')]">
      <div v-for="(item, index) in weekArr" :key="index" class="weekItem">
        {{ item }}
      </div>
    </div>
  </header>
  <main>
    <div v-for="(item, index) in showDay" :key="index" class="row"  @click="selectDay(item[0])">
      <span v-for="ite in item" class="day">{{ ite.value }}</span>
    </div>
  </main>
</template>
<script setup lang='ts'>
import { nm } from '../context'
import { ref } from 'vue'
import {TyiArrowLeftDoubleLine,TyiArrowLeftSLine ,TyiArrowRightSLine,TyiArrowRightDoubleLine} from 'toyaricon'

const emit = defineEmits(['selectData'])
const weekArr = [ '一', '二', '三', '四', '五', '六','日' ]
const countDate = [new Date().getFullYear(), new Date().getMonth()]
let nowDate = ref('')
let befMonth = ref([])
let nowMonth = ref(0)
let aftMonth = ref(0)
let showDay = ref([])
const render = (dateArr: Array<any>) => {
  // 1.获取当前年月日
  showDay.value = []
  let date = new Date(dateArr[0], dateArr[1])
  let year = date.getFullYear()
  let month = date.getMonth()
  // 2.展示当前年月日
  nowDate.value = `${dateArr[0]}年 ${dateArr[1] + 1}月`

  // 3.计算上个月展示几天
  befMonth.value = []
  let flag = true
  let index = 0
  while (flag) {
    let lastDay = new Date(year, month, index)

    befMonth.value.unshift({
      key:`${month ===0?year-1:year}-${month ===0?12:month}-${lastDay.getDate()}`,
      value:lastDay.getDate()
    })
    index--
    if (lastDay.getDay() == 1) {
      flag = false
    }
  }
  
  //  4. 计算当前月份展示几天
  nowMonth.value = new Date(year, month + 1, 0).getDate()
  aftMonth.value = 42 - befMonth.value.length - nowMonth.value
  let countArr = []

  countArr.push(...befMonth.value)

  for (let i = 1; i <= nowMonth.value; i++) {
    countArr.push({
      key:`${year}-${month + 1}-${i}`,
      value:i
    })
  }
  for (let i = 1; i <= aftMonth.value; i++) {
    countArr.push({
      key:`${month ===11?year+1:year}-${month ===11?1:month + 2}-${i}`,
      value:i
    })
  }

  let arr = []

  for (let i = 0; i < countArr.length; i++) {
    if (i % 7 === 0) {
      arr = []
      showDay.value.push(arr)
    }
    arr.push(countArr[i])
  }
}
render(countDate)
const lastYear = () => {
  countDate[0] = countDate[0] - 1
  render(countDate)
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

function getWeekNumber(date) {
    // 创建一个新的日期对象，避免修改原日期对象
    const currentDate = new Date(date);
    // 设置日期为当年的 1 月 1 日
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    // 获取 1 月 1 日是星期几，0 表示星期日，1 到 6 表示星期一到星期六
    const firstDayOfYear = startOfYear.getDay();
    // 计算当前日期是当年的第几天
    const dayOfYear = Math.floor((currentDate - startOfYear) / (24 * 60 * 60 * 1000));
    // 计算该日期是第几周
    const weekNumber = Math.ceil((dayOfYear + firstDayOfYear) / 7);
    return weekNumber;
}
const selectDay = (day: string) => {
  let date = new Date(day.key)
  emit('selectData', `${date.getFullYear()}-${String(date.getMonth() + 1)}第${getWeekNumber(day.key)}周`)
}

</script>
<style lang="scss" scoped>
.ty-datePicker {
  header {
    .ty-datePicker__com {
      display: flex;
      width: 100%;
      justify-content: space-between;

      div:not(.nowDate):hover {
        color: var(--primary-6);
        cursor: pointer;
      }
    }

    .ty-datePicker__week {
      font-size: var(--font-body-1);
      margin-top: 20px;

      div {
        display: inline-block;
        width: calc(100% / 7);
        text-align: center;
      }
    }
  }

  main {
    margin-top: 20px;

    .row {
      .day {
        display: inline-block;
        width: calc(100% / 7);
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: var(--border-radius-4);

        span {
          display: inline-block;
          height: 35px;
          width: 35px;
          text-align: center;
          line-height: 35px;
          border-radius: var(--border-radius-circle);
        }

        &:hover {
          cursor: pointer;

          span {
            background-color: var(--primary-6);
          }
        }
      }

      &:hover {
        background-color: var(--primary-1);
      }
    }

  }
}
</style>
