<template>
  <transition name="ty-notification-fade">
  <div
    class="ty-notification"
    :style="{
      top: `${topValue}px`
    }"
    v-show="visible"
    ref="notificationRef"
  >
    <div class="ty-notification-icon" v-if="type">
      <TyIcon :icon="msgIconObj[type]" :color="`var(--${colorObj[type]}-5)`">
      </TyIcon>
    </div>
    <div class="ty-notification-info">
      <div class="ty-notification-header">
        <div class="ty-notification-title">
          {{ title }}
        </div>
        <div class="ty-notification-close">
          <TyIcon icon="ty-close-fill"></TyIcon>
        </div>
      </div>
      <div class="ty-notification-body">
        {{ message }}
      </div>
    </div>
  </div>
</transition>
</template>

<script setup>
import {ref,onMounted,nextTick} from 'vue'
import TyIcon from '../../icon'
const props = defineProps({
  type: {
    type: String,
    validator (value) {
      if (value) {
        return ['info', 'success', 'warning', 'error'].includes(value)
      }
      return true
    }
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  top: {
    type: String
  },
  time:{
    type: String
  }
})
const emit = defineEmits(['close'])

let topValue = ref(props.top)
const visible = ref(false)
const notificationRef  =ref()
const colorObj = {
  info: 'primary',
  success: 'success',
  warning: 'warning',
  error: 'danger'
}
const msgIconObj = {
  info: 'ty-information-fill',
  success: 'ty-checkbox-circle-fill',
  warning: 'ty-information-fill',
  error: 'ty-close-circle-fill'
}
let height = ref(0)
const getCompHeight = () => {
  height.value = notificationRef.value.getBoundingClientRect().height
}
const timmer = setTimeout(() => {
  close()
}, props.time)
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
const floatNoti =value =>{
  topValue.value = topValue.value - value
}
onMounted(() => {
  (visible.value = true),
    nextTick(() => {
      getCompHeight()
    })
})
defineExpose({
  floatNoti,
  close,
  height
})
</script>
<style lang="scss" scoped>
.ty-notification-fade-enter-active,
.ty-notification-fade-leave-active {
  transition: all 0.5s ease;
}

.ty-notification-fade-enter-from,
.ty-notification-fade-leave-to {
  transform: translateY( -100%) !important;
  opacity: 0;
}
.ty-notification {
  display: flex;
  padding: 16px 14px;
  width: 300px;
  z-index: 99;
  position: fixed;
  right: 28px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  transition: all 1s ease;

  .ty-notification-icon {
    margin-right: 12px;
    font-size: 35px;
    display: flex;
    align-items: center;
  }
  .ty-notification-info {
    width: 100%;
    .ty-notification-header {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      font-weight: 500;
      background-color: #fff;
      color: #303133;
      .ty-notification-close {
        cursor: pointer;
      }
    }
    .ty-notification-body {
      margin-top: 5px;
      font-size: 14px;
      color: #606266;
    }
  }
}
</style>
