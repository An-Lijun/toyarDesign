<template>
  <div
    :class="[
      nm.b(),
      nm.m(size),
      nm.is('focus', focus),
      nm.is('disabled', disabled),
      nm.is('readonly', readonly),
      nm.is(
        'error',
        (tyFormItem && tyFormItem.formItemError.isShowErrorMsg) || false
      )
    ]"
  >
    <!-- 输入框 -->
    <input
      type="text"
      ref="nativeInp"
      @click="isShowCalendar = true"
      :disabled="disabled"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    <span ref="innerAft" :class="[nm.e('innerAft')]">
      <TyIcon icon="ty-calendar-line"></TyIcon>
    </span>
    <span
      v-if="isShowClearBtn"
      :class="[nm.e('clear')]"
      :style="{
        position: 'absolute',
        right: '10px'
      }"
      @click="clear"
    >
    </span>
    <div
      :class="[nm.e('box')]"
      v-show="isShowCalendar"
      :style="`top: var(--size-${size});`"
    >
      <header>
        <div :class="[nm.e('com')]">
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
        <div :class="[nm.e('week')]">
          <div v-for="(item, index) in weekArr" :key="index" class="weekItem">
            {{ item }}
          </div>
        </div>
      </header>
      <main>
        <div v-for="(item, index) in befMonth" class="dis day">
          <span>{{ item }}</span>
        </div>
        <div
          v-for="(item, index) in nowMonth"
          class="day"
          @click="selectDay(item)"
        >
          <span>{{ item }}</span>
        </div>
        <div v-for="(item, index) in aftMonth" class="dis day">
          <span>{{ item }}</span>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang='ts' name="TyCalendar">
import { calendarProp, calendarEmit,nm } from './context'
import { formItemContent} from '../../../hooks/symbolNm'

const props = defineProps(calendarProp)
const emit = defineEmits(calendarEmit)
const tyFormItem =inject(formItemContent,null);

const focus = ref(false)
const nativeInp = ref()
const isShowCalendar = ref(false)
const weekArr = ['日', '一', '二', '三', '四', '五', '六']
const countDate = [new Date().getFullYear(), new Date().getMonth()]
let nowDate = ref('')
let befMonth = ref([])
let nowMonth = ref(0)
let aftMonth = ref(0)

let isShowClearBtn = computed(() => {
  return props.modelValue !== '' && props.clearable && !props.disabled
})
const handleFocus = () => {}
const render = dateArr => {
  // 1.获取当前年月日
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
const selectDay = day => {
  isShowCalendar.value = false
  nativeInp.value.value = `${countDate[0]}-${countDate[1] + 1}-${day}`
  emit('update:modelValue', `${countDate[0]}-${countDate[1] + 1}-${day}`)
}
const clear = () => {
  nativeInp.value.value = ``
  emit('update:modelValue', ``)
}

watch(
  () => props.modelValue,
  () => {
    nativeInp.value.value = `${props.modelValue}`
  }
)
</script>

<style lang="scss" scoped>
.ty-calendar {
  border-radius: var(--border-radius-4);

  color: var(--text-1);
  display: flex;
  position: relative;
  user-select: none;
  input {
    width: 100%;
    height: 100%;
    flex-grow: 1;
    padding: unset;
    border: unset;
    box-sizing: border-box;
    border-radius: var(--border-radius-4);
    outline: unset;
    color: var(--text-1);
    background-color: var(--fill-2);
    padding: 0 30px 0 10px;

    &.is-outPre {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &.is-outAft {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  &__innerAft {
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    right: 10px;
    top: 0;
  }
  &__clear {
    display: none;
    height: 100%;
    &:before {
      font-family: 'toyaricon' !important;
      font-style: normal;
      display: inline-block;
      content: '\eb99';
    }
    &:hover {
      &::before {
        font-family: 'toyaricon' !important;
        font-style: normal;
        display: inline-block;
        content: '\eb97';
        cursor: pointer;
      }
    }
  }

  &:hover {
    background-color: var(--fill-3);
    border-radius: var(--border-radius-4);

    input {
      background-color: var(--fill-3);
      border-radius: var(--border-radius-4);
    }

    .ty-calendar__clear {
      background-color: var(--fill-3);
      display: block;
    }
  }

  &.is-focus {
    background-color: var(--color-bg-2);
    box-shadow: 1px 1px var(--primary-6), -1px 1px var(--primary-6),
      1px -1px var(--primary-6), -1px -1px var(--primary-6);

    input {
      background-color: var(--color-bg-2);
    }
  }

  &.is-error {
    box-shadow: 1px 1px var(--danger-6), -1px 1px var(--danger-6),
      1px -1px var(--danger-6), -1px -1px var(--danger-6);
  }

  &.is-disabled {
    background-color: var(--fill-2);
    color: var(--text-4);

    input {
      color: var(--toyar-gray-4);
      background-color: var(--fill-2);
      cursor: no-drop;
    }
    .ty-calendar__innerAft {
      --toyar-gray-10: var(--toyar-gray-4);
      :hover {
        cursor: no-drop;
      }
    }
  }

  &__box {
    position: absolute;
    width: 100%;
    z-index: 5;
    padding: 10px;
    border: var(--border-1) solid var(--fill-3);
    background-color: var(--color-bg-5);
    // --bg-5
    box-shadow: var(--box-shadow-5);
    border-radius: var(--border-radius-4);
    user-calendar: none;
    color: var(--text-1);
    box-sizing: border-box;
    header {
      .ty-calendar__com {
        display: flex;
        width: 100%;
        justify-content: space-between;

        div:not(.nowDate):hover {
          color: var(--primary-6);
          cursor: pointer;
        }
      }

      .ty-calendar__week {
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

  // ------------------------  input尺寸样式  ------------------------
  $inputSize: (mini, small, medium, large);

  @mixin addInputSize($name) {
    &--#{$name} {
      height: var(--size-#{$name});
      line-height: var(--size-#{$name});
    }
  }

  @each $name in $inputSize {
    @include addInputSize($name);
  }
}
</style>
