<template>
  <header>
    <div :class="[nm.e('com')]">
      <div class="lastYear" @click="lastYear">
        <TyiArrowLeftDoubleLine  />
      </div>

      <div>

        {{ countDate }}
      </div>

      <div class="nextYear" @click="nextYear">
        <TyiArrowRightDoubleLine  />
      </div>
    </div>
  </header>
  <main>
    <div v-for="(item, index) in showSeason" :key="index" class="season" @click="selectDay(item)">
      <span>{{ item }}</span>
    </div>
  </main>
</template>
<script setup lang='ts'>
import { ref } from 'vue'
import { nm } from '../context'
import {TyiArrowRightDoubleLine,TyiArrowLeftDoubleLine} from 'toyaricon'
const emit = defineEmits(['selectData'])

let countDate = ref(new Date().getFullYear())
let showSeason = ref(['Q1','Q2','Q3','Q4'])

const lastYear = () => {
  countDate.value = countDate.value - 1
}
const nextYear = () => {
  countDate.value = countDate.value + 1
}
const selectDay =(date)=>{
  emit('selectData',countDate.value + date)
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
