<template>
  <aside :class="nm.b()" 
    :style="{
      width:`${width}px`
    }"
  >
    <slot></slot>
  </aside>
</template>
<script setup lang="ts" name="TyAside">
import useNmSpace from '../../../hooks/useBem';

const props = defineProps({
  width: {
    type: String,
    default: "100",
  },
});
const nm =useNmSpace('aside')

</script>
<style lang="scss" scoped>
  .ty-aside{
    height: 100%;
  }
</style>
