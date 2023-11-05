<template>
  <div ref="root" :class="[
    'ty-input',
    `ty-input-${size}`,
    {
      'is-focus': focus,
      'is-disabled': disabled,
      'is-readonly': readonly
    }
  ]">
    <!-- 前置元素 -->
    <div class="ty-input-outPre" ref="outPre" v-if="useSlots().outPre">
      <slot name="outPre"></slot>
    </div>
    <!-- 前置内容 -->
    <span class="ty-input-innerPre" v-if="useSlots().innerPre" 
       ref="innerPre" 
       :style="{
         color: disabled?'var(--text-4)':'var(--text-1)',
         transform: `translateX(${outPreWidth}px)`
    }">
      <slot name="innerPre"></slot>
    </span>
    <!-- 输入框 -->
    <input type="text" ref="nativeInp" :disabled="disabled" :class="[
      {
        'is-outPre': outPreWidth > 0,
        'is-outAft': outAftWidth > 0
      }
    ]" :style="[
  {
    paddingLeft: `${innerPreWidth + 20}px`,
    paddingRight: `${innerAftWidth + 20}px`
  }
]" @input="handleInput" @blur="handleBlur" @focus="handleFocus" />
    <!-- 后置内容 -->
    <span ref="innerAft" class="ty-input-innerAft" v-if="useSlots().innerAft&& !isShowClearBtn" :style="{
      transform: `translateX(-${outAftWidth}px)`,
    }">
      <slot name="innerAft"></slot>
    </span>

    <span v-if="isShowClearBtn" class="ty-input-clear" :style="{
      position: 'absolute',
      right: '10px',
      transform: `translateX(-${outAftWidth}px)`
    }" @click="clear">
    </span>
    <!-- 后置元素 -->
    <div class="ty-input-outAft" ref="outAft" v-if="useSlots().outAft ">
      <slot name="outAft">

      </slot>
    </div>
  </div>
</template>
<script setup>
import {configProviderDisabled} from '../../hooks/symbolNm'
import { formContent,formItemContent} from '@/package/hooks/symbolNm'

import { ref, onMounted, toRefs,reactive , useSlots, useAttrs, watch } from 'vue'
const attrs = useAttrs()
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
const outPre = ref()
const innerPre = ref()
const outAft = ref()
const innerAft = ref()
const focus = ref(false)
let outPreWidth = ref(0)
let innerPreWidth = ref(0)
let outAftWidth = ref(0)
let innerAftWidth = ref(0)
const provideInp=reactive ({disabled})
provide(configProviderDisabled,provideInp)

onMounted(() => {
  outPreWidth.value = outPre?.value?.clientWidth
  innerPreWidth.value = innerPre?.value?.clientWidth
  outAftWidth.value = outAft?.value?.clientWidth
  innerAftWidth.value = innerAft?.value?.clientWidth
  setNativeInp(props.modelValue)
})
function setNativeInp(value) {
  nativeInp.value.value = value
}
function handleInput(event) {
  emit('update:modelValue', event.target.value)
}
function handleBlur(event) {
  if(tyForm){
    tyForm.validate(tyFormItem.prop);
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
</script>

<style lang="scss" scoped>
.ty-input {
  display: flex;
  width: 100%;
  position: relative;
  color: var(--text-1);
  background-color: var(--fill-2);
  border-radius: var(--border-radius-4);
  border: unset;
  box-sizing: border-box;
  transition: all var(--time-5);

  .ty-input-outPre {
    border: var(--border-1) solid transparent;
    border-radius: var(--border-radius-4) 0 0 var(--border-radius-4);
    display: flex;
    align-items: center;

    ::v-deep() .ty-button {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      margin-left: -1px;
    }
  }

  .ty-input-innerPre {
    height: 100%;
    display: flex;
    left: 10px;
    position: absolute;
    align-items: center;
  }

  .ty-input-innerAft {
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    right: 10px;
  }

  .ty-input-outAft {
    border-radius: 0 var(--border-radius-4) var(--border-radius-4) 0;
    display: flex;
    align-items: center;
    margin-right: -1px;

    ::v-deep() .ty-button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

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
    &.is-outPre {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;

    }

    &.is-outAft {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

  }


  .ty-input-clear{
    display: none;
    &:before {
    font-family: 'toyaricon' !important;
    font-style: normal;
    display: inline-block;
    content: '\eb99';
  }
  }


  .ty-input-clear:hover {
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
    .ty-input-clear{
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
  .ty-input-#{$name} {
    height: var(--size-#{$name});
    line-height: var(--size-#{$name});
  }
}

@each $name in $inputSize {
  @include addInputSize($name);
}
</style>
