<template>
  <transition name="ty-message-fade">
    
    <div
      ref="messageRef"
      v-show="visible"
      :style="{
        top: `${topValue}px`
      }"
      :class="[nm.b(), nm.m(type)]"
    >
      <div :class="nm.e('icon')">
        <slot name="icon">
          <component :is="msgIconObj[type]" :size="18" ></component>
        </slot>
      </div>
      <div :class="nm.e('msg')">
        {{ msg }}
      </div>
      <div :class="nm.e('close')">
        <slot name="close">
          <TyiCloseFill/>
        </slot>
      </div>
    </div>
  </transition>
</template>
<script setup>
import {TyiCloseFill} from 'toyaricon'
import {ref,onMounted,nextTick  } from 'vue';
import {msgProps,msgEmit,nm} from './context.ts'
import { TyiInformationFill,TyiCheckboxCircleFill,TyiCloseCircleFill } from 'toyaricon'

defineOptions({
  name: 'TyMessage'
})

const props = defineProps(msgProps)
const emit = defineEmits(msgEmit)
const messageRef = ref()
const visible = ref(false)
let topValue = ref(props.top)

const msgIconObj = {
  info: TyiInformationFill,
  success: TyiCheckboxCircleFill,
  warning: TyiInformationFill,
  error: TyiCloseCircleFill
}
const type = msgIconObj.hasOwnProperty(props.options?.type)
  ? props.options?.type
  : 'info'

const timmer = setTimeout(() => {
  close()
}, props.options?.time)

const close = () => {
  if (timmer) {
    clearTimeout(timmer)
  }
  visible.value = false
  const smTimmer = setTimeout(() => {
    emit('close')
    clearTimeout(smTimmer)
  }, 500)
}
let height = ref(0)
const getCompHeight = () => {
  height.value = messageRef.value.getBoundingClientRect().height
}

onMounted(() => {
  (visible.value = true),
    nextTick(() => {
      getCompHeight()
    })
})

const floatMsg = value => {
  topValue.value = topValue.value - value
}
defineExpose({
  floatMsg,
  close,
  height
})
</script>
