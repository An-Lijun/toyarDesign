<!-- 
  @input="aainput"
  @blur ="aablur"
  @click ='aaClick'
  @clear	点击清除按钮的回调	() => void	-	-
  @parseEnter
 -->

<template>
  <div :class="[
    'ty-input',
    `ty-input-${size}`,
    {
      'is-focus': focus,
      'is-disabled': disabled,
      'is-readonly': readonly,
      'is-error': tyFormItem && tyFormItem.formItemError.isShowErrorMsg
    }
  ]">
    <!-- 前置元素 -->
    <div class="ty-input-outPre" ref="outPre" v-if="useSlots().outPre||outPreText"
      :style="{
        padding: `0 ${useSlots().outPre? '0':'10px'}`
      }"
    >
      <slot name="outPre">
        {{ outPreText }}
      </slot>
    </div>
    <!-- 前置内容 -->
    <span class="ty-input-innerPre" v-if="useSlots().innerPre" ref="innerPre" :style="{
      color: disabled ? 'var(--text-4)' : 'var(--text-1)',
      transform: `translateX(${outPreWidth}px)`
    }">
      <slot name="innerPre">
      </slot>
    </span>
    <!-- 输入框 -->
    <input 
      :maxlength="attrs.maxlength"
       v-show="isShowFormat"
      :class="[{
          'is-outPre': outPreWidth > 0,
          'is-outAft': outAftWidth > 0
      }]"
      :style="[{
        paddingLeft: `${innerPreWidth + 20}px`,
        paddingRight: `${(innerAftWidth>0?innerAftWidth:16) + (limitBlockWidth>0?limitBlockWidth-10:0) + 20}px`
      }]"
        :disabled="disabled"
        :readonly="readonly" 
        :value="formatValue"
        @click="handleToFocus"
      />
    <input
     :type="attrs.type||'text'"
     :maxlength="attrs.maxlength"
      ref="nativeInp" v-show="!isShowFormat"
       v-model="model" 
     :class="[{
        'is-outPre': outPreWidth > 0,
        'is-outAft': outAftWidth > 0
      }]"
      
      :style="[{
        paddingLeft: `${innerPreWidth + 20}px`,
        paddingRight: `${(innerAftWidth>0?innerAftWidth:16) + (limitBlockWidth>0?limitBlockWidth-10:0) + 20}px`
      }]"
      :disabled="disabled" 
      :readonly="readonly" 
      @input="handleInput" @blur="handleBlur" @focus="handleFocus" 
      @keydown.enter="handleEnter"
      />
   
    <!-- 后置内容 -->
    <!-- && !isShowClearBtn -->
    <span ref="innerAft" class="ty-input-innerAft" v-if="useSlots().innerAft" :style="{
       transform: `translateX(-${limitBlockWidth>0? limitBlockWidth+outAftWidth-10 :outAftWidth}px)`
    }">
      <slot name="innerAft"></slot>
    </span>
    <!-- clearAble -->
    <span v-if="isShowClearBtn"
    :class="[
      'ty-input-clear'
    ]"
    :style="{
      position: 'absolute',
      right: '10px',
      top:'0',
      transform: `translateX(-${limitBlockWidth>0? limitBlockWidth+outAftWidth-10 :outAftWidth}px)`
    }" @click="handleClear">
    </span>

    <span class="ty-input-limit"
      v-if="showLimit"
      ref="limitBlock"
      :style="{
        transform: `translateX(-${outAftWidth|| 18}px)`
      }"
    >
      {{ model.length  }}/{{ attrs.maxlength }}
    </span>
    <!-- 后置元素 -->
    <div class="ty-input-outAft" ref="outAft" v-if="useSlots().outAft||outAftText"
     :style="{
        padding: `0 ${useSlots().outAft? '0': '10px'}`
      }"
    >
      <slot name="outAft">
        {{ outAftText }}
      </slot>
    </div>

    
  </div>
</template>
<script setup>
import {inputProps} from './props'
import { formContent, formItemContent ,configProviderDisabled} from '../../../hooks/symbolNm'
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import { ref, onMounted,computed ,
   toRefs, reactive, useSlots, useAttrs, watch ,inject,provide } from 'vue'

// 属性
const attrs = useAttrs()
const props = defineProps(inputProps)
const emit = defineEmits(['blur', 'input', 'update:modelValue'])
const {  modelValue } = toRefs(props)
const tyForm = inject(formContent,null);
const tyFormItem = inject(formItemContent,null);

// ref
const limitBlock =ref();
const nativeInp = ref()
const outPre = ref()
const innerPre = ref()
const outAft = ref()
const innerAft = ref()


const focus = ref(false)
let outPreWidth = ref(0)
const formatValue =ref('')
let limitBlockWidth = ref(0)
let innerPreWidth = ref(0)
let outAftWidth = ref(0)
let innerAftWidth = ref(0)
const isShowFormat =ref(true);

// computed 继承属性
const disabled = computed(() => {
  return props.disabled || tyFormItem?.disabled ||  tyForm?.disabled
})
const readonly = computed(() => {
  return props.readonly || tyFormItem?.readonly ||  tyForm?.readonly
})
const size = computed(() => {
  return props.size || tyFormItem?.size ||  tyForm?.size ||'small'
})

const provideInp = reactive({ disabled })
const { model } = useCompMvalue(props, emit)
provide(configProviderDisabled, provideInp)

onMounted(() => {
  outPreWidth.value = outPre?.value?.offsetWidth 
  innerPreWidth.value = innerPre?.value?.offsetWidth 
  outAftWidth.value = outAft?.value?.offsetWidth 
  innerAftWidth.value = innerAft?.value?.offsetWidth 
  limitBlockWidth.value =limitBlock?.value?.offsetWidth||0
})

function handleInput(event) {
  limitBlockWidth.value =limitBlock?.value?.offsetWidth||0
  // emit('update:modelValue', event.target.value)
  emit('input', event.target.value)
}

function handleToFocus(){
  isShowFormat.value = false;
  setTimeout(() => {
    nativeInp.value.focus()
  });
}

function handleBlur(event) {
  if (tyForm && tyFormItem && tyFormItem.prop) {
    tyForm.validate(tyFormItem.prop, 'blur');
  }
  isShowFormat.value=true
  focus.value = false
  emit('blur', event)
}

function handleClear() {
  emit('update:modelValue', '')
  emit('clear')
}

function handleEnter(){
  emit('enter', model.value)
}

function handleFocus() {
  focus.value = true
}

let isShowClearBtn = computed(() => {
  return props.modelValue !== '' && props.clearable && !disabled.value && !readonly.value
})


watch(model, (newVal, oldVal) => {
  if(newVal){
    if(props?.format){
      formatValue.value = props.format(newVal) 

    }else{
      formatValue.value =''
    }
  }else{
    formatValue.value = ''

  }
},{ immediate:true})
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
  // transition: all var(--time-5);
  overflow: hidden;

  .ty-input-outPre {
    background-color: var(--fill-2);
    border-right: 1px solid var(--border-color-2);
    color:  var(--font-weight-4);;
    font-size: var(--font-body-1);
    display: flex;
    align-items: center;
    ::v-deep() .ty-button {
      border-radius: 0;
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
    border-left: 1px solid var(--border-color-2);

    background-color: var(--fill-2);
    color:  var(--font-weight-4);;
    display: flex;
    align-items: center;
    font-size: var(--font-body-1);

    ::v-deep() .ty-button {
      border-radius: 0;
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


  .ty-input-clear {
    height: 100%;
    top: 0;
    display: none;
    &:before {
      font-family: 'toyaricon' !important;
      font-style: normal;
      display: inline-block;
      content: '\eb99';
    }
  }
  
  .ty-input-clear:hover {
    display: flex;
    align-items: center;
    &::before {
      font-family: 'toyaricon' !important;
      font-style: normal;
      display: inline-block;
      content: '\eb97';
      cursor: pointer;
    }
  }
  .ty-input-limit{
    display: flex;
    align-items: center;
    position: absolute;
    height: 100%;
    top:0;
    right: 0;
    color: var(--text-3);
    font-size: var(--font-body-1);
    padding: 0 10px;
  }

  &:hover:not(.is-disabled) {
    background-color: var(--fill-3);
    .ty-input-outPre{
      border-color: var( --border-color-3);
    background-color: var(--fill-3);
    }
    .ty-input-outAft{
     background-color: var(--fill-3);
      border-color: var( --border-color-3);
    }
    input {
      background-color: var(--fill-3);
    }

    .ty-input-clear {
      display: flex;
      align-items: center;
    }
    .ty-input-innerAft{
      display: none;
    }
  }

  &.is-focus {
    background-color: var(--color-bg-2);
    // box-shadow: 0px 0px var(--primary-6),
    //   0px 0px var(--primary-6),
    //   0px 0x var(--primary-6),
    //   0px 0px var(--primary-6);
      border: 1px solid var(--primary-6);

    input {
      background-color: var(--color-bg-2);
    }
  }

  &.is-error {
    // box-shadow: 1px 1px var(--danger-6),
    //   -1px 1px var(--danger-6),
    //   1px -1px var(--danger-6),
    //   -1px -1px var(--danger-6);
    border: 1px solid var(--danger-6);
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
  &.is-readonly {
    background-color: var(--fill-2);
    color: var(--text-4);

    input {
      color: var(--toyar-gray-4);
      background-color: var(--fill-1);
      // cursor: no-drop;
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
