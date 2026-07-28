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
<script setup>
import { useProps, useEmits, nm } from './context'
import { TyiArrowLeftDoubleLine, TyiArrowLeftSLine, TyiArrowRightSLine, TyiArrowRightDoubleLine } from 'toyaricon'
import TyButton from '../../button'
import useCalendar from './use-calendar'

defineOptions({
  name: 'TyCalendar'
})

defineProps(useProps)
const emit = defineEmits(useEmits)

const {
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
} = useCalendar(emit)

defineExpose({
  lastYear,
  lastMonth,
  nextMonth,
  nextYear,
  goTday,
  getNowDate
})
</script>
