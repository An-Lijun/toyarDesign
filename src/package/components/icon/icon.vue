<template>
   <i :class="[
    'ty-icon',
     icon
    ]"
    :style="{
      'fontSize':props.size >0?size+'px':'unset',
      'color': color
    }"
   >
   </i>
</template>
<script lang='ts' setup >
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
    default: '#000'
  }
});
</script>
<style lang="scss" scoped>
.ty-icon{
  font-size: 1em;
}
</style>
