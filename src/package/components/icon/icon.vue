<template>
   <i :class="[
    'toyar',
     icon
    ]"
    :style="{
      'fontSize':props.size >0?size+'px':'unset',
      'color': color ?color:'var(--toyar-gray-10)'
    }"
   >
   </i>
</template>
<script lang='ts' setup>
const props = defineProps({
  icon: {
    type: String,
    default: ""
  },
  size: {
    type:Number,
    default: 0
  },
  color:{
    type:String,
  }
});
</script>
<style lang="scss" scoped>
.ty-icon{
  font-size: 1em;
}
</style>
