<template>
  <div :class="[nm.b(), nm.bem('', '', shape)]">
    <img :src="src" :alt="alt" :style="{
      width: `${size}px`,
      height: `${size}px`,
      objectFit: fit
    }">
  </div>
</template>
<script setup>
import { nm, useProps, useEmits } from './context'

defineOptions({
  name: 'TyImage'
})

defineProps(useProps)
defineEmits(useEmits)
</script>
