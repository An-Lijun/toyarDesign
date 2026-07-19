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
    <TyiEyeOffLine v-if="isPassworld"/>
    <TyiEyeLine v-else/>
 
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
import {TyiEyeOffLine,TyiEyeLine} from 'toyaricon'
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


