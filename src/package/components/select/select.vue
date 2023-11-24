<template>
  <div ref="root" :class="[
    'ty-select',
    `ty-select-${size}`,
    {
      'is-focus': focus,
      'is-disabled': disabled,
      'is-readonly': readonly,
      'is-error':tyFormItem && tyFormItem.formItemError.isShowErrorMsg
    }
  ]">

    <!-- 输入框 -->
    <input type="text" ref="nativeInp" @click="isShowOption=true" :disabled="disabled" 
     @input="handleInput" 
     @blur="handleBlur" 
     @focus="handleFocus" />
    <span v-if="isShowClearBtn" class="ty-select-clear" :style="{
      position: 'absolute',
      right: '10px',
    }" @click="clear">
    </span>
    <ul class="ty-select-group" v-show="isShowOption">
       <slot> </slot>
    </ul>
  </div>
</template>
<script setup>
import {selectContent} from '../../hooks/symbolNm'
import { formContent,formItemContent} from '@/package/hooks/symbolNm'

import { ref, onMounted, toRefs,reactive , useAttrs, watch } from 'vue'
const props = defineProps({
  size: {
    type: String,
    default: 'small',
    validator: value => {
      return ['mini', 'small', 'medium', 'large'].includes(value)
    }
  },
  clearable: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: [String, Number],
    required: true,
    default: ''
  }
})
const tyForm = inject(formContent);
const tyFormItem =inject(formItemContent);
const{disabled,readonly,modelValue,size} =toRefs(props)
const root = ref();
const emit = defineEmits(['blur', 'input', 'update:modelValue'])
const nativeInp = ref()
const focus = ref(false)
let outAftWidth = ref(0)
// const provideInp=reactive ({disabled})

onMounted(() => {
  setNativeInp(props.modelValue)
})
const isShowOption =ref(false)
function setNativeInp(value) {
  nativeInp.value.value = value
  emit('update:modelValue',value)
}
function handleInput(event) {
  emit('update:modelValue', event.target.value)
}
function handleBlur(event) {
  if(tyForm&&tyFormItem&&tyFormItem.prop){
    tyForm.validate(tyFormItem.prop,'blur');
  }
  focus.value = false
  emit('blur', event)
}
function clear() {
  emit('update:modelValue', '')
}
function handleFocus() {
  focus.value = true
}
let isShowClearBtn  = computed(()=>{
 return props.modelValue!=='' && props.clearable && !props.disabled
})
watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    setNativeInp(newVal)
  }
)
provide(selectContent,{setNativeInp,isShowOption})

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
    width: 0;
    flex-grow: 1;
    padding: unset;
    border: unset;
    box-sizing: border-box;
    border-radius: var(--border-radius-4);
    outline: unset;
    color: var(--text-1);
    background-color: var(--fill-2);
    padding:0 30px 0 10px;
    &.is-outPre {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &.is-outAft {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

  }

  .ty-select-clear{
    display: none;
    &:before {
    font-family: 'toyaricon' !important;
    font-style: normal;
    display: inline-block;
    content: '\eb99';
  }
  }

  .ty-select-clear:hover {
    &::before {
      font-family: 'toyaricon' !important;
      font-style: normal;
      display: inline-block;
      content: '\eb97';
      cursor: pointer;
    }
  }

  &:hover {
    background-color: var(--fill-3);

    input {
      background-color: var(--fill-3);
    }
    .ty-select-clear{
      display: block; 
    }
  }

  &.is-focus {
    background-color: var(--color-bg-2);
    box-shadow: 1px 1px var(--primary-6),
      -1px 1px var(--primary-6),
       1px -1px var(--primary-6),
      -1px -1px var(--primary-6);
    input {
      background-color: var(--color-bg-2);
    }
  }

  &.is-error{
    box-shadow: 1px 1px var(--danger-6),
      -1px 1px var(--danger-6),
       1px -1px var(--danger-6),
      -1px -1px var(--danger-6);
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
  .ty-select-#{$name} {
    height: var(--size-#{$name});
    line-height: var(--size-#{$name});
  }
}

@each $name in $inputSize {
  @include addInputSize($name);
}
.ty-select-group{
  position: absolute;
  z-index: 2;
  top: 10px;
  box-sizing: border-box;
  list-style: none;
  padding: unset;
  border:1px solid var(--fill-3);
  background-color: var(--color-bg-1);
  box-shadow: var(--box-shadow-5);
  width: 100%;
  border-radius: var(--border-radius-4);
  padding: 5px 0;
}
</style>
