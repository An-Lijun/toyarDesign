<template>
  <div :class="[nm.b(),nm.is('square',shape==='square'),nm.is('circle',shape==='circle')]" ref="avatarRef" :style="{
    width: width,
    height: width
  }">
    <span ref="textRef" :class="[nm.e('text')]">
      <slot></slot>
    </span>
  </div>
</template>
<script setup>
import { backTopProps, nm } from './context'
import {ref,onMounted} from 'vue'
defineOptions({
  name: 'TyAvatar'
})
const props = defineProps(backTopProps)
const avatarRef = ref()
const textRef = ref()
onMounted(() => {
  const avatarWidth = avatarRef.value.offsetWidth;
  const textWidth = textRef.value.clientWidth;
  const scale = avatarWidth / (textWidth + 8);
  if (avatarWidth && scale < 1) {
    textRef.value.style.transform = `scale(${scale}) `;
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
    white-space:nowrap;
  }
  &.is-square{
    border-radius: var(--border-radius-4);
  }
  &.is-circle{
    border-radius: var(--border-radius-circle);
  }
}
</style>
