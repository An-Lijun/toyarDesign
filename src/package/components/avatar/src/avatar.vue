<template>
  <div
    :class="[nm.b(), nm.is('square', shape === 'square'), nm.is('circle', shape === 'circle')]"
    ref="avatarRef"
    :style="{
      width: width,
      height: width
    }"
  >
    <span ref="textRef" :class="[nm.e('text')]" :style="{ transform: textTransform }">
      <slot></slot>
  
    </span>
    <span :class="nm.e('trigger')" @click="()=>{emit('trigger')}">
        <slot name="trigger"></slot>
      </span>
  </div>
</template>

<script setup>
import { backTopProps, nm } from './context'
import { ref, onMounted } from 'vue'
defineOptions({
  name: 'TyAvatar'
})
const props = defineProps(backTopProps)
const avatarRef = ref()
const textRef = ref()

const getTextTransform = () => {
  if (!avatarRef.value || !textRef.value) return ''

  const avatarWidth = avatarRef.value.offsetWidth
  const textWidth = textRef.value.clientWidth

  if (avatarWidth === 0 || textWidth === 0) return ''

  const scale = avatarWidth / (textWidth + 8)
  if (scale < 1) {
    return `scale(${scale})`
  }

  return ''
}

const textTransform = ref('')

onMounted(() => {
  if(props.autoSize){
    // 使用 ref 更新响应式样式
    textTransform.value = getTextTransform()
  }
})
</script>

<style lang="scss" scoped>
.ty-avatar {
  min-width: 30px;
  min-height: 30px;
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: var(--toyar-gray-4);

  &__text {
    position: absolute;
    white-space: nowrap;
  }

  &.is-square {
    border-radius: var(--border-radius-4);
  }

  &.is-circle {
    border-radius: var(--border-radius-circle);
  }
  &__trigger{
    position: absolute;
    right: -3px;
    bottom: -3px;
    padding: 1px;
    background-color: var(--toyar-gray-3);
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &:hover{
      cursor: pointer;
    }
    
  }
}
</style>