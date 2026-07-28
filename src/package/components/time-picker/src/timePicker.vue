<template>
  <div :class="[
    nm.b(),
    nm.m(size),
    nm.is('focus', focus),
    nm.is('disabled', disabled),
    nm.is('readonly', readonly),
    nm.is(
      'error',
      (tyFormItem && tyFormItem.formItemError.isShowErrorMsg) || false
    )
  ]" ref="containerRef">
    <TyInput v-model="model" :format="formatTime" v-bind="attrs" @input="handleInput" @focus="handleFocus"
      @blur="handleBlur" @clear="handleClear" :maxlength="maxlength" inputmode="numeric">
      <template #innerAft>
        <TyiCalendarScheduleLine />
      </template>
    </TyInput>
    <div ref="popRef" :class="[nm.e('box')]" v-show="isShowTimePicker" :style="`top: var(--size-${size});`">
      <div :class="nm.e('content')">
        <div>
          <div :class="nm.e('hour')">
            <span v-for="item in hours" :key="item" @click="selectHour(item)" :class="{
              active:item === value[0]
            }">
              {{ item }}
            </span>
          </div>
          <div :class="nm.e('minute')">
            <span v-for="item in minutes" :key="item" @click="selectMinute(item)" :class="{
              active:item === value[1]
            }">
              {{ item }}
            </span>
          </div>
          <div :class="nm.e('second')">
            <span v-for="item in seconds" :key="item" @click="selectSecond(item)" :class="{
              active:item === value[2]
            }">
              {{ item }}
            </span>
          </div>
        </div>
        <footer :class="nm.e('footer')">
          <TyButton @click="confirm">
            确定
          </TyButton>
        </footer>
      </div>

      <div ref="arrowRef" data-popper-arrow :class="nm.e('arrow')">
      </div>
    </div>
  </div>
</template>
<script setup>
import { TyiCalendarScheduleLine } from 'toyaricon'
import { useProps, nm, useEmits } from './context'
import useTimePicker from './use-time-picker'

defineOptions({
  name: 'TyTimePicker'
})

const model = defineModel()
const props = defineProps(useProps)
const emit = defineEmits(useEmits)

const {
  attrs,
  tyFormItem,
  popRef,
  arrowRef,
  containerRef,
  isShowTimePicker,
  disabled,
  readonly,
  size,
  hours,
  minutes,
  seconds,
  value,
  focus,
  maxlength,
  selectHour,
  selectMinute,
  selectSecond,
  confirm,
  handleFocus,
  handleInput,
  handleBlur,
  handleClear,
  formatTime
} = useTimePicker(props, emit, model)
</script>

<style lang="scss" scoped>
.ty-timePicker {
  &__box {
    border: var(--border-1) solid var(--fill-3);
    background-color: var(--color-bg-1);
    padding: 5px;
    border-radius: 4px;
  }
  &__content {
    height: 140px;
    min-width: 150px;
    &>div {
      display: flex;
      height: 100px;
    }
  }
  &__footer {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }

  &__hour {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: auto;
    padding: 0 10px;
  }

  &__minute {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
    padding: 0 10px;

  }

  &__second {
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
    padding: 0 10px;

  }
  span{
    padding: 0 5px;
    text-align: center;
    &:hover{
      cursor: pointer;
    }
    &.active{
      background-color: var(--primary-6);
      color: #fff;
    }
  }
}



[data-popper-placement="top"] {
  .ty-timePicker__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px;
    border-color: var(--fill-3) transparent transparent transparent;
    z-index: -1;
    bottom: -12px;
    display: flex;

    &::after {
      content: '';
      display: inline-block;

      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 8px;
      transform: translate(-8px, -9px);

      border-color: var(--color-bg-1) transparent transparent transparent;
    }
  }
}

[data-popper-placement="bottom"] {
  .ty-timePicker__arrow {
    position: absolute;
    width: 0;
    height: 0;
    left: 1px;
    display: flex;

    top: 0px;
    border-style: solid;
    border-width: 6px;
    border-color: transparent transparent var(--fill-3) transparent;
    top: -13px;
    z-index: -1;

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 8px;
      left: -50%;
      border-color: transparent transparent var(--color-bg-1) transparent;
      transform: translate(-8px, -7px);

    }
  }
}
</style>
