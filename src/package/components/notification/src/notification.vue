<template>
  <transition name="ty-notification-fade">
    <div
      :class="nm.b()"
      :style="{
        top: `${topValue}px`
      }"
      v-show="visible"
      ref="notificationRef"
    >
      <div :class="nm.e('icon')" v-if="type">
        <TyIcon :icon="msgIconObj[type]" :color="`var(--${colorObj[type]}-5)`">
        </TyIcon>
      </div>
      <div :class="nm.e('info')">
        <div :class="nm.e('header')">
          <div :class="nm.e('title')">
            {{ title }}
          </div>
          <div :class="nm.e('close')">
            <TyIcon icon="ty-close-fill"></TyIcon>
          </div>
        </div>
        <div :class="nm.e('body')">
          {{ message }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import TyIcon from '../../icon'
import { notProps, notEmits, nm } from './context'

const props = defineProps(notProps)
const emit = defineEmits(notEmits)

let topValue = ref(props.top)
const visible = ref(false)
const notificationRef = ref()
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
const floatNoti = value => {
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
  transform: translateY(-100%) !important;
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

  &__icon {
    margin-right: 12px;
    font-size: 35px;
    display: flex;
    align-items: center;
  }
  &__info {
    width: 100%;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 500;
    background-color: #fff;
    color: #303133;
  }
  &__close {
    cursor: pointer;
  }
  &__body {
    margin-top: 5px;
    font-size: 14px;
    color: #606266;
  }
}
</style>
