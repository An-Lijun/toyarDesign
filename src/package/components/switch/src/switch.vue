<template>
  <div
    :class="[
      nm.b(),
      nm.m(size),
      nm.m(type),
      nm.is('open',isOpen),
      nm.is('disabled', disabled),
    ]"
    @click="click"
  >
    <span v-if="props.checkedText && isOpen" class="checkedText">
      {{ props.checkedText }}
    </span>
    <div :class="nm.e('boll')"></div>
    <span v-if="props.uncheckedText && !isOpen" class="uncheckedText">
      {{ props.uncheckedText }}
    </span>
  </div>
</template>
<script setup>
import { computed,inject } from 'vue';
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import {switchProps,switchEmits,nm} from './context'
import {
  formContent,
  formItemContent
} from '../../../hooks/symbolNm'
defineOptions({
  name:'TySwitch'
})

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)
const tyForm = inject(formContent, null)
const tyFormItem = inject(formItemContent, null)

const model =defineModel('modelValue',{
  type:[Array,String,Number,Boolean],
  required:true
})
// const { model } = useCompMvalue(props, emit)
const isOpen =computed(()=>{
  if (typeof model.value === 'boolean') {
    return model.value
  }
  return model.value === props.openValue
})

// computed 继承属性
const disabled = computed(() => {
  return props.disabled || tyFormItem?.disabled || tyForm?.disabled || false
})

const click = () => {
  if(props.disabled){
    return
  }
  model.value = model.value===props.openValue? props.closeValue:props.openValue
  emit('change',model.value)
}
</script>
