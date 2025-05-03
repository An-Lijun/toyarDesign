<template>
  <div :class="[nm.b()]">
    <header :class="nm.e('header')">
      <slot name="controller">
        <div :class="[nm.e('com')]">
          <div :class="[nm.e('sel')]">
            <div class="lastYear" @click="lastYear">
              <TyiArrowLeftDoubleLine icon="ty-arrow-left-double-line" />
            </div>
            <div class="lastMonth" @click="lastMonth">
              <TyiArrowLeftSLine icon="ty-arrow-left-s-line" />
            </div>
            <div class="nowDate">{{ nowDate }}</div>
            <div class="nextMonth" @click="nextMonth">
              <TyiArrowRightSLine icon="ty-arrow-right-s-line" />
            </div>
            <div class="nextYear" @click="nextYear">
              <TyiArrowRightDoubleLine icon="ty-arrow-right-double-line" />
            </div>
          </div>
          <TyButton type="text" @click="goTday">今天</TyButton>
        </div>
      </slot>
    </header>
    <div :class="[nm.e('week')]">
      <div v-for="(item, index) in weekArr" :key="index" class="weekItem">
        {{ item }}
      </div>
    </div>

    <main :class="[nm.e('main')]">
      <!-- 上个月 -->
      <div v-for="(item, index) in befMonth" :key="index" class="dis dayItem" :style="{
        height: dayItemHeight + 'px'
      }">
        <slot name="dayItem" :data="{ day: `${nowMonthStr}-${padZero(item)}`, type: 'before' }">
          <span class="date">{{ item }}</span>
        </slot>
      </div>

      <!-- 本月  -->
      <div v-for="(item, index) in nowMonth" :key="index" class="dayItem" @click="selectDay(item)" :class="{
        'today-date': `${nowMonthStr}-${padZero(item)}` == nowDateStr
      }">
        <slot name="dayItem" :data="{ day: `${nowMonthStr}-${padZero(item)}`, type: 'now' }">
          <span class="date">{{
            `${nowMonthStr}-${padZero(item)}` == nowDateStr ? '今' : item
          }}</span>
        </slot>
      </div>

      <!-- 下个月 -->
      <div v-for="(item, index) in aftMonth" :key="index" class="dis dayItem">
        <slot name="dayItem" :data="{ day: `${nowMonthStr}-${padZero(item)}`, type: 'after' }">
          <span class="date">{{ item }}</span>
        </slot>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts" name="TyCalendar">
import { calendarProp, calendarEmit, nm } from './context'
import { ref } from 'vue'
import { formatDate } from 'robinson'
import type { Ref } from 'vue'
import {TyiArrowLeftDoubleLine,TyiArrowLeftSLine,TyiArrowRightSLine,TyiArrowRightDoubleLine} from 'toyaricon'

defineOptions({
  name: 'TyCalendar'
})
defineProps(calendarProp)
const emit = defineEmits(calendarEmit)

const countDate = [new Date().getFullYear(), new Date().getMonth()]
let nowDate = ref('')
let nowMonthStr = ref('')
let befMonth: Ref<Array<number>> = ref([])
let nowMonth = ref(0)
let aftMonth = ref(0)

const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
let nowDateStr = formatDate(new Date())

const padZero = (num: number) => {
  return String(num).padStart(2, '0')
}
const render = (dateArr: Array<any>) => {
  // 1.获取当前年月日
  let date = new Date(dateArr[0], dateArr[1])
  let year = date.getFullYear()
  let month = date.getMonth()
  // 2.展示当前年月日
  nowDate.value = `${dateArr[0]}年 ${dateArr[1] + 1}月`
  nowMonthStr.value = `${dateArr[0]}-${padZero(dateArr[1] + 1)}`

  // 3.计算上个月展示几天
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
  //  4. 计算当前月份展示几天
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

defineExpose({
  lastYear,
  lastMonth,
  nextMonth,
  nextYear,
  goTday,
  getNowDate: () => nowDate.value

})

</script>

<style lang="scss" scoped>
.ty-calendar {
  border-radius: var(--border-radius-4);
  width: 100%;
  z-index: 5;
  border: var(--border-1) solid var(--fill-3);
  background-color: var(--color-bg-5);
  border-radius: var(--border-radius-4);
  color: var(--text-1);
  padding: 25px;
  box-sizing: border-box;
  user-select: none;
  min-width: 500px;
  color: var(--text-1);

  &__header {
    .ty-calendar__com {
      display: flex;
      justify-content: space-between;
      padding: 15px 0px;

      .ty-calendar__sel {
        i:not(.nowDate):hover {
          color: var(--primary-6) !important;
          cursor: pointer;
        }
      }
    }

    .ty-calendar__sel {
      display: flex;
      width: 40%;
      justify-content: space-between;
      align-items: center;
    }


  }

  &__week {
    font-size: var(--font-body-1);
    padding-bottom: 5px;
    margin-bottom: 5px;

    div {
      display: inline-block;
      width: calc(100% / 7);
      text-align: right;
      box-sizing: border-box;
      padding-right: 5px;
    }
  }

  &__main {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;

    .dayItem {
      display: inline-block;
      width: calc(100% / 7);
      min-height: 110px;
      text-align: center;
      // border-radius: var(--border-radius-4);
      border-left: 1px solid var(--toyar-gray-3);
      border-top: 1px solid var(--toyar-gray-3);
      box-sizing: border-box;
      position: relative;

      .date {
        display: inline-block;
        height: 25px;
        width: 25px;
        text-align: center;
        line-height: 25px;
        border-radius: var(--border-radius-circle);
        position: absolute;
        font-size: 12px;
        top: 5px;
        right: 5px;
      }

      &:hover {
        cursor: pointer;

        span {
          color: #fff;
          background-color: var(--primary-6);
        }
      }

      &.today-date span {
        color: #fff;
        background-color: var(--primary-6);
      }
    }

    .dis {
      color: var(--text-4);

      &:hover {
        cursor: not-allowed;

        span {
          color: var(--text-4);
          background-color: unset;
        }
      }
    }

    .dayItem.dayItem:nth-child(7n - 6) {
      // background-color: red;
      border-left: unset;
    }

    .dayItem.dayItem:nth-child(7n) {
      // background-color: red;
      border-right: unset;
    }
  }
}
</style>
