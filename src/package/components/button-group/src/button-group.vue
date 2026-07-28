<template>
  <div :class="nm.b()">
    <slot></slot>
  </div>
</template>
<script setup>
import { nm, useProps, useEmits } from './context'

defineOptions({
  name: 'TyButtonGroup'
})

defineProps(useProps)
defineEmits(useEmits)
</script>
