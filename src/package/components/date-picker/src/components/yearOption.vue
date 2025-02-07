<template>
  <header>
    <div :class="[nm.e('com')]">
      <div class="lastYear" @click="lastYear">
        <TyIcon icon="ty-arrow-left-double-line" />
      </div>

      <div>

        {{ befYear }} ~ {{ aftYear }}
      </div>

      <div class="nextYear" @click="nextYear">
        <TyIcon icon="ty-arrow-right-double-line" />
      </div>
    </div>
  </header>
  <main>
    <div  class="dis year">
      <span>{{ befYear }}</span>
    </div>
    <div v-for="(item, index) in showYear" :key="index" class="year" @click="selectDay(item)">
      <span>{{ item }}</span>
    </div>
    <div class="dis year">
      <span>{{ aftYear }}</span>
    </div>
  </main>
</template>
<script setup lang='ts'>
import { ref } from 'vue'
import { nm } from '../context'
const emit = defineEmits(['selectData'])

let countDate = new Date().getFullYear()
let befYear = ref()
let nowYear = ref('')
let showYear = ref([])
let aftYear = ref('')
const render = (date) => {
  showYear.value = []
  befYear.value =date -1 
  nowYear.value = date
  for (let i = 0; i <18; i++) {
    // 2.展示当前年月日
    showYear.value.push(date + i)
  }
  aftYear.value = date+15

}
render(countDate)
const lastYear = () => {
  countDate = countDate - 19
  render(countDate)
}
const nextYear = () => {
  countDate = countDate + 19

  render(countDate)
}
const selectDay =(date)=>{
  emit('selectData',date)
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

    .year {
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
