<template>
  <div :class="[nm.b(), nm.is('square', shape === 'square'), nm.is('circle', shape === 'circle')]" ref="avatarRef"
    :style="{
      width: width,
      height: width
    }">
    <span ref="textRef" :class="[nm.e('text')]" :style="{ transform: textTransform }">
      <slot></slot>
    </span>
    <span :class="nm.e('trigger')" @click="() => { emit('trigger') }">
      <slot name="trigger"></slot>
    </span>
  </div>
</template>

<script setup>
import { nm, avatarProps, avatarEmits } from './context'
import useAvatar from './use-avatar';

defineOptions({
  name: 'TyAvatar'
})

const props = defineProps(avatarProps);
const emit = defineEmits(avatarEmits);
const { avatarRef, textRef, textTransform } = useAvatar(props, emit, nm);
</script>