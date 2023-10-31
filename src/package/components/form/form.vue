<template>
  <form 
    class="ty-form"
    :class="{}"
  >
    <slot></slot>
  </form>
</template>
<script lang='ts' setup>
import { provide,defineProps} from "vue";
const props =defineProps({
  formData:Object,
  rules: Object,
  labelWidth:String,
  labelPosition: String,
  size:String,
  disabled:Boolean,
  readonly:Boolean,

});

provide('tyForm',{
  props
})

</script>

<style lang="scss" scoped>
</style>
