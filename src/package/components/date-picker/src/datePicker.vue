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
        <TyiCalendarLine/>
      </template>
    </TyInput>
    <div ref="popRef" :class="[nm.e('box')]" v-show="isShowDatePicker" :style="`top: var(--size-${size});`">
      <component :is="opType" @selectData="selectData"></component>
      <div ref="arrowRef" data-popper-arrow :class="nm.e('arrow')">
      </div>
    </div>
  </div>
</template>
<script setup lang='ts' name="TyDatePicker">
import { datePickerProp, datePickerEmit, nm } from './context'
import { formContent, formItemContent } from '../../../hooks/symbolNm'
import { inject, ref, computed, watch, useAttrs } from 'vue';
import { arrow, createPopper } from '@popperjs/core';
import {TyiCalendarLine} from 'toyaricon'
import dayOption from './components/dayOption.vue'
import yearOption from './components/yearOption.vue'
import seasonOption from './components/seasonOption.vue'
import weekOption from './components/weekOption.vue'
import monthOption from './components/monthOption.vue'


defineOptions({
  name: 'TyDatePicker'
})

const model = defineModel()

const attrs = useAttrs()
const props = defineProps(datePickerProp)
const emit = defineEmits(datePickerEmit)
const tyForm = inject(formContent, null)
const tyFormItem = inject(formItemContent, null);
const focus = ref(false)
const isShowDatePicker = ref(false)
const formatValue = ref('')

let popperInstance = null
const popRef = ref();
const arrowRef = ref();
const containerRef = ref();

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

const opType = computed(() => {
  switch (props.opType) {
    case 'day':
      return dayOption
    case 'year':
      return yearOption
    case 'season':
      return seasonOption
    case 'month':
      return monthOption
    case 'week':
      return weekOption

  }
})
const handleClear = () => {

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
  isShowDatePicker.value = true
  createInstance()
}

const selectData = (data) => {
  isShowDatePicker.value = false
  emit('update:modelValue', data)
}
function formatTime(timestamp: string | Date) {
  if (['year', 'season', 'week'].includes(props.opType)) {
    return timestamp
  }

  // yyyy-MM-dd hh:mm:ss
  let result = props.format || 'yyyy-MM-dd';
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
watch(
  () => props.modelValue,
  (newVal, oldVal) => {

    if (newVal) {
      if (props?.formatValue) {
        formatValue.value = props.formatValue(newVal)
      } else {
        formatValue.value = ''
      }
    } else {
      formatValue.value = ''
    }
  },
  { immediate: true }
)

</script>

<style lang="scss" scoped>
.ty-datePicker {
  border-radius: var(--border-radius-4);

  color: var(--text-1);
  display: flex;
  position: relative;
  user-select: none;

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
    // user-calendar: none;
    color: var(--text-1);
    box-sizing: border-box;

  }

  // ------------------------  input尺寸样式  ------------------------
  $inputSize: (
    mini,
    small,
    medium,
    large
  );

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


[data-popper-placement="top"] {
  .ty-datePicker__arrow {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px;
    /* 调整箭头大小 */
    border-color: var(--fill-3) transparent transparent transparent;
    z-index: -1;
    bottom: -13px;
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
  .ty-datePicker__arrow {
    position: absolute;
    width: 0;
    height: 0;
    left: 1px;
    display: flex;

    top: 1px;
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
