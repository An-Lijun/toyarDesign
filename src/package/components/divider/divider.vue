<template>
  <div :class="`ty-divider-${direction}`">
    <span class="ty-divider-inner" v-if="useSlots().default" :class="`ty-divider-${position}`">
      <slot> </slot>
    </span>
  </div>
</template>
<script lang='ts' setup>
import { useSlots } from "vue";
const props = defineProps({
  direction: {
    type: String,
    default: "row",
    validator: (value) => {
      return ["row", "column"].includes(value);
    },
  },
  position: {
    type: String,
    default: "center",
    validator: (value) => {
      return ["center", "left", "right",'bottom','top'].includes(value);
    },
  },
});
</script>
<style lang="scss" scoped>
.ty-divider-inner{
  position: absolute;
  background-color: var(--color-bg-1);
  font-weight: var(--font-weight-5);
  color: var(--toyar-gray-10);
  font-size: var(--font-body-3);
  padding: 0 var(--padding-2);

}
.ty-divider-row{
  background-color: var(--toyar-gray-2);
  height: var(--border-1);
  width: 100%;
  margin: var(--padding-2) 0;
  position: relative;
  
  .ty-divider-left {
    left: 0;
    transform: translate(50%, -50%);
  }
  .ty-divider-center {
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .ty-divider-right {
    right: 0;
    transform: translate(-50%, -50%);
  }
}
.ty-divider-column{
  background-color: var(--toyar-gray-2);
  width: var(--border-1);
  height: 100%;
  margin: 0 var(--padding-2);
  position: relative;
  .ty-divider-top {
    top: 0;
    transform: translate(-50%, 50%);
  }
  .ty-divider-center {
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .ty-divider-bottom {
    bottom: 0;
    transform: translate(-50%, -50%);
  }
}

</style>
