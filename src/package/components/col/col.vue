<template>
  <div
    class="ty-col"
    :style="{
      width: (100 / 24) * span + '%',
      marginLeft: (100 / 24) * offset + '%',
      padding:0 +' ' + gutter.value +'px' 
    }"
  >
    <slot></slot>
  </div>
</template>
<script lang='ts' setup >
import { inject } from "vue";
const gutter = inject("gutter");
const props = defineProps({
  span: {
    type: Number,
    default: 24,
  },
  offset: {
    type: Number,
    default: 0,
  },
});

</script>
<style lang="scss" scoped>
.ty-col {
  display: inline-block;
  box-sizing: border-box;
}
</style>
