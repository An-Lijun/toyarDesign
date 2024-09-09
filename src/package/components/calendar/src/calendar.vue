<template>
  <div :class="[nm.e('box')]">
    <header>
      <div :class="[nm.e('com')]">
        <div :class="[nm.e('sel')]">
          <div class="lastYear" @click="lastYear">
            <TyIcon icon="ty-arrow-left-double-line" />
          </div>
          <div class="lastMonth" @click="lastMonth">
            <TyIcon icon="ty-arrow-left-s-line" />
          </div>
          <div class="nowDate">{{ nowDate }}</div>
          <div class="nextMonth" @click="nextMonth">
            <TyIcon icon="ty-arrow-right-s-line" />
          </div>
          <div class="nextYear" @click="nextYear">
            <TyIcon icon="ty-arrow-right-double-line" />
          </div>

        </div>
        <TyButton type="text" @click="goTday">今天</TyButton>


      </div>
      <div :class="[nm.e('week')]">
        <div v-for="(item, index) in weekArr" :key="index" class="weekItem">
          {{ item }}
        </div>
      </div>
    </header>
    <main>
      <div v-for="(item, index) in befMonth" :key="index" class="dis day">
        <span class="date">{{ item }}</span>
        <slot :day="`${nowStr}-${item}`"></slot>
      </div>
      <div v-for="(item, index) in nowMonth" :key="index" class="day" @click="selectDay(item)"
       :class="{ 'today-date': `${nowStr}-${item}` ==  nowDateStr}"
      > 
        <span class="date">{{ `${nowStr}-${item}` ==  nowDateStr ? '今' :item }}</span>
        <slot :day="`${nowStr}-${item}`"></slot>

      </div>
      <div v-for="(item, index) in aftMonth" :key="index" class="dis day">
        <span class="date">{{ item }}</span>
        <slot :day="`${nowStr}-${item}`"></slot>

      </div>
    </main>
  </div>
</template>
<script setup lang='ts' name="TyCalendar">
import { calendarProp, calendarEmit, nm } from './context'
import { ref } from 'vue';

defineOptions({
  name: 'TyCalendar'
})
 defineProps(calendarProp)
const emit = defineEmits(calendarEmit)

const weekArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const countDate = [new Date().getFullYear(), new Date().getMonth()]
let nowDate = ref('')
let nowStr = ref('')
let befMonth = ref([])
let nowMonth = ref(0)
let aftMonth = ref(0)

let nowDateStr = formatTime(new Date(), 'yyyy-MM-dd')
const render = (dateArr: Array<any>) => {
  // 1.获取当前年月日
  let date = new Date(dateArr[0], dateArr[1])
  let year = date.getFullYear()
  let month = date.getMonth()
  // 2.展示当前年月日
  nowDate.value = `${dateArr[0]}年 ${dateArr[1] + 1}月`
  nowStr.value = `${dateArr[0]}-${String(dateArr[1] + 1).padStart(2, '0')}`


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
const goTday=()=>{
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
const selectDay = (day: string) => {
  let data = `${countDate[0]}-${String(countDate[1] + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  emit('click', data)
}


function formatTime(timestamp: string | Date, fmtString: string) {
  // yyyy-MM-dd hh:mm:ss
  let result = fmtString;
  const date = new Date(timestamp);
  const dateObj: any = {
    'y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (const key in dateObj) {
    const keyRe = new RegExp(key);
    //如果有这个校验规则,
    if (keyRe.test(result)) {
      const value = `${dateObj[key]}`.padStart(2, '0');
      result = result.replace(keyRe, value);
    }
  }
  return result;
}


</script>

<style lang="scss" scoped>
.ty-calendar {
  border-radius: var(--border-radius-4);
  min-width: 500px;
  color: var(--text-1);
  display: flex;
  user-select: none;

  &__box {
    width: 100%;
    z-index: 5;
    border: var(--border-1) solid var(--fill-3);
    background-color: var(--color-bg-5);
    // --bg-5
    border-radius: var(--border-radius-4);
    user-calendar: none;
    color: var(--text-1);
    box-sizing: border-box;
    padding: 25px;
    box-sizing: border-box;

    header {
      .ty-calendar__com {
        display: flex;
        justify-content: space-between;
        padding: 15px 0px;

        .ty-calendar__sel{
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

      .ty-calendar__week {
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
    }

    main {
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;

      .day {
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
        &.today-date span{
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

      .day.day:nth-child(7n - 6) {
        // background-color: red;
        border-left: unset;
      }

      .day.day:nth-child(7n) {
        // background-color: red;
        border-right: unset;
      }
    }
  }
}
</style>
