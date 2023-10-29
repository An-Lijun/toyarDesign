<template>
  <div
    class="ty-row"
    :style="{
      margin: 0 + ' ' + gutter / 2 + 'px',
    }"
  >
    <slot> </slot>
  </div>
</template>
<script lang='ts' setup name='TyRow'>
import { provide } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "line",
  },
  gutter: {
    type: Number,
    default: 0,
  },
});
provide("gutter", {
  value:props.gutter
});
</script>
<style lang="scss" >
.ty-row {
  .ty-col {
    // background-color: red;
    // padding:0 20px;
  }
}
</style>
