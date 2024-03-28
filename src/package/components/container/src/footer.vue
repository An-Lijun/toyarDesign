<template>
  <footer 
    :style="[
      nm.b(),
      {
        height: `${height}px`
      }
    ]"
  > 
    <slot></slot>
  </footer>
</template>
<script setup lang="ts" name="TyFooter">
import useNmSpace from '@/package/hooks/useBem';

const props = defineProps({
  height: {
    type: String,
    default: "100",
  },
});
const nm =useNmSpace('footer')

</script>
<style lang="scss" scoped>
  .ty-footer{
    width: 100%;
  }
</style>
