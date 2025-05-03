<template>
  <div ref="containerRef" :class="[
    nm.b(),
    nm.m(size),
    nm.is('focus', focus),
    nm.is('disabled', disabled),
    nm.is('readonly', readonly),
    nm.is('error', tyFormItem && tyFormItem.formItemError.isShowErrorMsg)
  ]">
    <!-- 输入框 -->
    <input type="text" ref="nativeInp" :placeholder="placeholder" @click.stop="handleClick" :disabled="disabled"
      @input="handleInput" @blur="handleBlur" @focus="handleFocus" />

    <span ref="innerAft" :class="[nm.e('innerAft')]">
    </span>
    <span v-if="isShowClearBtn" :class="nm.e('clear')" :style="{
      position: 'absolute',
      right: '10px'
    }" @click="clear">
    </span>
    <ul :class="nm.e('group')" v-show="isShowOption" ref="popRef" :style="{width: width}">
      <div :class="nm.e('arrow')" ref="arrowRef"></div>
      <slot> </slot>
    </ul>
  </div>
</template>
<script setup>
import { selectContent } from '../../../hooks/symbolNm'
import { formContent, formItemContent } from '../../../hooks/symbolNm'
import { selectOptions } from '../../../hooks/symbolNm'
import { arrow, createPopper } from '@popperjs/core';

import {
  ref,
  onMounted,
  toRefs,
  reactive,
  useAttrs,
  watch,
  provide,
  computed,
  inject,
  onUnmounted
} from 'vue'
import { selProps, selEmits, nm } from './context'
defineOptions({
  name: 'TySelect'
})
const props = defineProps(selProps)
const emit = defineEmits(selEmits)

const options = {}
const tyForm = inject(formContent, null)
const tyFormItem = inject(formItemContent, null)
const { disabled, readonly, modelValue, size } = toRefs(props)
const container = ref()
const nativeInp = ref()
const focus = ref(false)
let outAftWidth = ref(0)
let popperInstance = null
const popRef = ref();
const arrowRef = ref();
const containerRef = ref();
const handleClick = () => {
  createInstance()
  isShowOption.value = true
}
provide(selectOptions, (label, value) => {
  options[value] = label
})
// const provideInp=reactive ({disabled})

onMounted(() => {
  setNativeInp(props.modelValue, '')
})
const isShowOption = ref(false)
function setNativeInp(value, label) {
  nativeInp.value.value = label
  emit('update:modelValue', value)
}
function getValue() {
  return props.modelValue
}
function handleInput(event) {
  // emit('update:modelValue', event.target.value)
}
function handleBlur(event) {
  if (tyForm && tyFormItem && tyFormItem.prop) {
    tyForm.validate(tyFormItem.prop, 'blur')
  }
  focus.value = false
  emit('blur', event)
}
function clear() {
  if (props.multiple) {
    emit('update:modelValue', [])
  } else {
    emit('update:modelValue', '')
  }
}
function handleFocus() {
  focus.value = true
}
let isShowClearBtn = computed(() => {
  return props.modelValue !== '' && props.clearable && !props.disabled
})
watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    if (props.modelValue === oldVal) {
      return
    }
    setNativeInp(newVal, options[newVal] || '')
  }
)
const closeOption = () => {
  isShowOption.value = false
}

const createInstance = () => {
  popperInstance = createPopper(unref(containerRef), unref(popRef), {
    placement: 'bottom',
    modifiers: [
      {
        name: 'offset',
        options: {
          // 偏移值 左右，上下
          offset: [0, 10]
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
onMounted(() => {
  document.addEventListener('click', closeOption)
})
onUnmounted(() => {
  document.removeEventListener('click', closeOption)
})
provide(selectContent, {
  setNativeInp,
  isShowOption,
  getValue,
  options,
  multiple: props.multiple
})
defineExpose({
  selectVal:(value) => {
    nativeInp.value.value = value

    emit('update:modelValue', value)
  }
});

</script>

<style lang="scss" scoped>
.ty-select {
  display: flex;
  width: 100%;
  position: relative;
  color: var(--text-1);
  background-color: var(--fill-2);
  border-radius: var(--border-radius-4);
  border: unset;
  box-sizing: border-box;
  transition: all var(--time-5);

  input {
    width: 100%;
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

  .ty-select__clear {
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

    input {
      background-color: var(--fill-3);
    }

    .ty-select__clear {
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
      background-color: var(--fill-1);
      cursor: no-drop;
    }
  }
}

// ------------------------  input尺寸样式  ------------------------
$inputSize: (
  mini,
  small,
  medium,
  large
);

@mixin addInputSize($name) {
  .ty-select--#{$name} {
    height: var(--size-#{$name});
    line-height: var(--size-#{$name});
  }
}

@each $name in $inputSize {
  @include addInputSize($name);
}

.ty-select__group {
  z-index: 2;
  box-sizing: border-box;
  list-style: none;
  padding: unset;
  border: 1px solid var(--fill-3);
  background-color: var(--color-bg-1);
  box-shadow: var(--box-shadow-5);
  width: 100%;
  border-radius: var(--border-radius-4);
  padding: 5px 0;
  z-index: 1000;
}

// .ty-select__arrow {
//   position: absolute;
//   border: 1px solid var(--fill-3);
//   // border-width: 8px;
//   // border-color: transparent;
//   border-bottom: unset;
//   border-left: unset;
//   background-color: var(--color-bg-1);
//   width: 8px;
//   height: 8px;
//   // border-bottom-width: 0;
//   top: -0.5px;
//   left: 50%;
//   z-index: -1;
//   transform: translate(-50%, -50%) rotate(-45deg);

//   // &::before{
//   //   content: '';

//   //   display: block;
//   //   position: absolute;
//   //   border:8px solid transparent;
//   //   border-bottom-color:  var(--color-bg-1);
//   //   left: -8px;
//   //   bottom: -10px;
//   // }
// }

[data-popper-placement="top"] {
  .ty-select__arrow {
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
      transform: translate(-8px,-9px);

      /* 调整箭头大小 */
      border-color: var(--color-bg-1) transparent transparent transparent;
    }
  }
}

[data-popper-placement="bottom"] {
  .ty-select__arrow {
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
      transform: translate(-8px,-7px);

    }
  }
}
</style>
