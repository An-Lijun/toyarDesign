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
          <component :is="msgIconObj[type]" :size="18"></component>
        </slot>
      </div>
      <div :class="nm.e('msg')">
        {{ msg }}
      </div>
      <div :class="nm.e('close')" @click="close">
        <slot name="close">
          <TyiCloseFill/>
        </slot>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { TyiCloseFill } from 'toyaricon'
import { nm, useProps, useEmits } from './context'
import useMessage, { msgIconObj } from './use-message'

defineOptions({
  name: 'TyMessage'
})

const props = defineProps(useProps)
const emit = defineEmits(useEmits)

const { messageRef, visible, topValue, height, type, close, floatMsg } = useMessage(props, emit)

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
  opacity: 0;
  transform: translateY(-100%);
}

.ty-message {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  min-width: 300px;

  &__icon {
    margin-right: 10px;
    font-size: 18px;
  }

  &__msg {
    flex: 1;
    font-size: 14px;
    color: #303133;
  }

  &__close {
    margin-left: 10px;
    cursor: pointer;
    font-size: 16px;
    color: #909399;

    &:hover {
      color: #606266;
    }
  }

  &--info {
    .ty-message__icon {
      color: var(--primary-5);
    }
  }

  &--success {
    .ty-message__icon {
      color: var(--success-5);
    }
  }

  &--warning {
    .ty-message__icon {
      color: var(--warning-5);
    }
  }

  &--error {
    .ty-message__icon {
      color: var(--danger-5);
    }
  }
}
</style>
