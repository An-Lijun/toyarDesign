<template>
  <div
    :class="[nm.b(), compStyle]"
    :style="{
      marginLeft: (100 / 24) * offset + '%',
      padding: 0 + ' ' + gutter?.value/2 + 'px' + ' ' + gutter?.value + 'px' 
    }"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts" name="TyCol">
import { nm, useProps } from './context'
import useCol from './use-col'

defineOptions({
  name: 'TyCol'
})

const props = defineProps(useProps)
const { gutter, compStyle } = useCol(props)
</script>
