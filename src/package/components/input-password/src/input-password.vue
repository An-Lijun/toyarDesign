<!-- 
  @input="aainput"
  @blur ="aablur"
  @click ='aaClick'
  @clear	点击清除按钮的回调	() => void	-	-
  @parseEnter
 -->

<template>
  <div
    :class="[
      nm.b(),
      nm.m(size),
      nm.is('focus',focus),
      nm.is('disabled',Boolean(disabled)),
      nm.is('readonly',Boolean(readonly)),
      nm.is('error',tyFormItem && tyFormItem.formItemError.isShowErrorMsg),
    ]"
  >
    <!-- 输入框 -->

    <input
      :type="isPassworld ? 'password' : 'text'"
      :maxlength="attrs.maxlength"
      ref="nativeInp"
      v-model="model"
      :style="[
        {
          paddingLeft: `${innerPreWidth + 20}px`,
          paddingRight: `${(innerAftWidth > 0 ? innerAftWidth : 16) + 20}px`
        }
      ]"
      :disabled="disabled"
      :readonly="readonly"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      @keydown.enter="handleEnter"
    />

    <!-- 后置内容 -->
    <span
      ref="innerAft"
      :class="nm.e('innerAft')"
      @click="isPassworld = !isPassworld"
    >
      <TyIcon
        :icon="`${isPassworld ? 'ty-eye-off-line' : 'ty-eye-line'}`"
      ></TyIcon>
    </span>
    <span
      v-if="isShowClearBtn"
      :class="nm.is('clear')"
      :style="{
        position: 'absolute',
        right: '30px',
        top: '0'
      }"
      @click="handleClear"
    >
    </span>
  </div>
</template>
<script setup>
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import { inputProps,nm } from './context'
import {
  formContent,
  formItemContent,
  configProviderDisabled
} from '../../../hooks/symbolNm'
import {
  ref,
  onMounted,
  computed,
  toRefs,
  reactive,
  useSlots,
  useAttrs,
  watch,
  inject,
  provide
} from 'vue'
defineOptions({
  name:'TyInputPassword'
})
// 属性
const attrs = useAttrs()
const props = defineProps(inputProps)
const emit = defineEmits(['blur', 'input', 'update:modelValue'])
const model = defineModel('modelValue')
const { modelValue } = toRefs(props)
//inject
const tyForm = inject(formContent, null)
const tyFormItem = inject(formItemContent, null)

// ref
const limitBlock = ref()
const nativeInp = ref()
const outAft = ref()
const innerAft = ref()

const focus = ref(false)
let limitBlockWidth = ref(0)
let innerPreWidth = ref(0)
let innerAftWidth = ref(0)

// computed 继承属性
const disabled = computed(() => {
  return props.disabled || tyFormItem?.disabled || tyForm?.disabled
})
const readonly = computed(() => {
  return props.readonly || tyFormItem?.readonly || tyForm?.readonly
})
const size = computed(() => {
  return props.size || tyFormItem?.size || tyForm?.size || 'small'
})

const provideInp = reactive({ disabled })
provide(configProviderDisabled, provideInp)

onMounted(() => {
  innerAftWidth.value = innerAft?.value?.offsetWidth
})

function handleInput (event) {
  // emit('update:modelValue', event.target.value)
  emit('input', event.target.value)
}

function handleToFocus () {
  focus.value = true
  setTimeout(() => {
    nativeInp.value.focus()
  })
}

function handleBlur (event) {
  if (tyForm && tyFormItem && tyFormItem.prop) {
    tyForm.validate(tyFormItem.prop, 'blur')
  }
  focus.value = false
  emit('blur', event)
}

function handleClear () {
  emit('update:modelValue', '')
  emit('clear')
}

function handleEnter () {
  emit('enter', model.value)
}

function handleFocus () {
  focus.value = true
}
const isPassworld = ref(true)

let isShowClearBtn = computed(() => {
  return (
    props.modelValue !== '' &&
    props.clearable &&
    !disabled.value &&
    !readonly.value
  )
})

</script>

<style lang="scss" scoped>
.ty-password {
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

  &__innerAft {
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    right: 10px;

    &:hover {
      cursor: pointer;
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
    &[type='password']::-ms-reveal {
      display: none;
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

  &:hover:not(.is-disabled) {
    background-color: var(--fill-3);

    input {
      background-color: var(--fill-3);
    }

    .ty-password-clear {
      display: flex;
      align-items: center;
    }

    .ty-password-innerAft {
      // display: none;
    }
  }

  &.is-clear {
    height: 100%;
    top: 0;
    display: none;

    &:before {
      font-family: 'toyaricon' !important;
      font-style: normal;
      display: inline-block;
      content: '\eb99';
    }

    &:hover{
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
  }

  &.is-focus:not(.is-disabled) {
    background-color: var(--color-bg-2);
    border: 1px solid var(--primary-6);

    input {
      background-color: var(--color-bg-2);
    }
  }

  &.is-error {
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


</style>
