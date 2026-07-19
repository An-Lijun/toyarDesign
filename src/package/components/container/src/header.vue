<template>
  <header
    :style="[
      nm.b(),
      {
        height: `${height}px`
      }
    ]"
  >
    <slot></slot>
  </header>
</template>
<script setup  lang="ts" name="TyHeader">
import useNmSpace from '../../../hooks/useBem'
defineOptions({
  name:'TyHeader'
})
defineProps({
  height: {
    type: String,
    default: '100'
  }
})
const nm = useNmSpace('header')
</script>
