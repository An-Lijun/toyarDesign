<template>
  <header>
    <div :class="[nm.e('com')]">
      <div class="lastYear" @click="lastYear">
        <TyIcon icon="ty-arrow-left-double-line" />
      </div>

      <div>
        {{ countDate }}
      </div>

      <div class="nextYear" @click="nextYear">
        <TyIcon icon="ty-arrow-right-double-line" />
      </div>
    </div>
  </header>
  <main>
    <div v-for="(item, index) in 12" :key="index" class="season" @click="selectDay(item)">
      <span>{{ item }}月</span>
    </div>
  </main>
</template>
<script setup lang='ts'>
import { ref } from 'vue'
import { nm } from '../context'
const emit = defineEmits(['selectData'])

let countDate = ref(new Date().getFullYear())
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
const lastYear = () => {
  countDate.value = countDate.value - 1
}
const nextYear = () => {
  countDate.value = countDate.value + 1
}
const selectDay =(date)=>{
  emit('selectData',countDate.value +'-' +String(date).padStart(2,'0'))
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

    .season {
      display: inline-block;
      width: 25%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      span {
        display: inline-block;
        height: 35px;
        width: 35px;
        text-align: center;
        line-height: 35px;
        padding: 0 20px;
        border-radius: var(--border-radius-4);

      }

      &:hover {
        color: #fff;
        cursor: pointer;

        span {
          background-color: var(--primary-6);
        }
      }
    }

    .dis {
      color: var(--text-4);

      &:hover {
        cursor: not-allowed;
        color: var(--text-4);

        span {
          background-color: unset;
        }
      }
    }
  }
}
</style>
