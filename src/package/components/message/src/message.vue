<template>
  <transition name="ty-message-fade">
    <div
      ref="messageRef"
      v-show="visible"
      :style="{
        top: `${topValue}px`
      }"
      :class="['ty-message', `ty-message-${type}`]"
    >
      <div class="ty-message-icon">
        <slot name="icon">
          <TyIcon :icon="msgIconObj[type]"></TyIcon>
        </slot>
      </div>
      <div class="ty-message-msg">
        {{ msg }}
      </div>
      <div class="ty-message-close">
        <slot name="close">
          <TyIcon icon="ty-close-fill"></TyIcon>
        </slot>
      </div>
    </div>
  </transition>
</template>
<script setup>
import TyIcon from '../../icon'
import {ref,onMounted,nextTick  } from 'vue';
defineOptions({
  name: 'TyMessage'
})
const props = defineProps({
  msg: {
    type: String,
    required: true
  },
  options: {
    type: Object
  },
  top: {
    type: String,
    default: '0'
  }
})
const emit = defineEmits(['close'])
const messageRef = ref()
const visible = ref(false)
let topValue = ref(props.top)

const msgIconObj = {
  info: 'ty-information-fill',
  success: 'ty-checkbox-circle-fill',
  warning: 'ty-information-fill',
  error: 'ty-close-circle-fill'
}
const type = msgIconObj.hasOwnProperty(props.options.type)
  ? props.options.type
  : 'info'

const timmer = setTimeout(() => {
  close()
}, props.options.time)

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
<style lang="scss" scoped>
.ty-message-fade-enter-active,
.ty-message-fade-leave-active {
  transition: all 0.5s ease;
}

.ty-message-fade-enter-from,
.ty-message-fade-leave-to {
  transform: translate(-50%, -100%) !important;
  opacity: 0;
}

.ty-message {
  position: fixed;
  left: 50%;
  max-width: 500px;
  min-width: 300px;
  padding: 10px 0;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  transform: translateX(-50%);
  transition: all 1s ease;
  box-sizing: border-box;

  .ty-message-icon,
  .ty-message-close {
    width: 40px;
    margin: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ty-message-msg {
    flex: 1;
    text-align: left;
    word-wrap: break-word;
    max-width: 420px;
  }

  // ---------------Message状态样式
  @mixin addMessageState($state, $value) {
    &.ty-message-#{$state} {
      background-color: var(--#{$value}-2);
      border: 1px solid var(--#{$value}-3);
      color: var(--#{$value}-5);

      .ty-message-icon,
      .ty-message-close {
        --toyar-gray-10: var(--#{$value}-7);
      }
    }
  }

  @each $state,
    $value
      in (
        'info': 'primary',
        'success': 'success',
        'warning': 'warning',
        'error': 'danger'
      )
  {
    @include addMessageState($state, $value);
  }
}
</style>
