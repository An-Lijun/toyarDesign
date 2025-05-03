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
      @blur="handleBlur(false)" @clear="handleClear" :maxlength="maxlength" inputmode="numeric">
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
import {TyiCalendarScheduleLine} from 'toyaricon'
import { nm, timeEmits, timeProps } from './context'
import { formContent, formItemContent } from '../../../hooks/symbolNm'
import { inject, ref, computed, watch, useAttrs } from 'vue';
import { arrow, createPopper } from '@popperjs/core';

defineOptions({
  name: 'TyTimePicker'
})
const props = defineProps(timeProps)
const emit = defineEmits(timeEmits)
const model = defineModel()
const tyFormItem = inject(formItemContent, null);
const tyForm = inject(formContent, null)

let popperInstance = null
const popRef = ref();
const arrowRef = ref();
const containerRef = ref();
const isShowTimePicker = ref(false)

// computed 继承属性
const disabled = computed(() => {
  return props.disabled || tyFormItem?.disabled || tyForm?.disabled || false
})
const readonly = computed(() => {
  return props.readonly || tyFormItem?.readonly || tyForm?.readonly || false
})
const size = computed(() => {
  return props.size || tyFormItem?.size || tyForm?.size || 'small'
})

const hours = ref(24)
const minutes = ref(60)
const seconds = ref(60)
const value = ref([0,0,0])
const selectHour = (val) => {
  value.value[0] = val
}

const selectMinute = (val) => {
  value.value[1] = val

}

const selectSecond = (val) => {
  value.value[2] = val
}

const confirm = () => {
  model.value = value.value.join(':')
  isShowTimePicker.value = false
  emit('update:modelValue', data)
}

const createInstance = () => {
  popperInstance = createPopper(unref(containerRef), unref(popRef), {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          // 偏移值 左右，上下
          offset: [0, 5]
        }
      },
      {
        name: 'arrow',
        options: {
          element: unref(arrowRef),
        }
      }
    ]
  });
  nextTick(() => {
    // 异步更新
    popperInstance.update()
  })
}
const handleFocus = () => {
  isShowTimePicker.value = true
  createInstance()
}

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
    /* 调整箭头大小 */
    border-color: var(--fill-3) transparent transparent transparent;
    z-index: -1;
    bottom: -12px;
    display: flex;

    /* 调整箭头颜色 */
    &::after {
      content: '';
      display: inline-block;

      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 8px;
      transform: translate(-8px, -9px);

      /* 调整箭头大小 */
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
    /* 调整箭头大小 */
    border-color: transparent transparent var(--fill-3) transparent;
    top: -13px;
    z-index: -1;

    /* 调整箭头颜色 */
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 8px;
      left: -50%;
      /* 调整箭头大小 */
      border-color: transparent transparent var(--color-bg-1) transparent;
      transform: translate(-8px, -7px);

    }
  }
}
</style>
