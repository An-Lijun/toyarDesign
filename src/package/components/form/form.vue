<template>
  <form 
    class="ty-form"
    :class="{}"
  >
    <slot></slot>
  </form>
</template>
<script lang='ts' setup>
import { provide,toRefs,defineProps} from "vue";
const props =defineProps({
  formData:Object,
  rules: Object,
  labelWidth:String,
});

provide('tyForm',{
  props
})

</script>

<style lang="scss" scoped>
</style>
