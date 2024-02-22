<template>
  <label class="ty-check-box">
    <input type="checkbox"  
      v-model="model"
      :value="value"
      :class="[
        `ty-check-box-${size}`
      ]"
    >
    <slot/>
  </label>

</template>
<script setup>
import {useCompMvalue} from '../..//hooks/useCompMvalue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  size: {
    type: String,
    default: 'small',
    validator: value => {
      return ['mini', 'small', 'medium', 'large'].includes(value)
    }
  },
  modelValue: {
    type: [String, Number],
    required: true,
    default: ''
  },
  value:{
    type:String,
    required:true
  }
})
const {model} =useCompMvalue(props,emit)

</script>
<style lang="scss" scoped>
.ty-check-box{
  display:inline-flex;
  align-items:center;
  user-select:none;
  input{
    appearance:none;
    border-radius: var(--border-radius-4);
    background-color: var(--fill-2);
    text-align:center;
    margin:unset;
    box-sizing: border-box;
    position: relative;
    margin-right:10px;
  }
  input:hover{
    cursor: pointer;
  }
  // ------------------------  checkBox尺寸样式  ------------------------
  $inputSize: (
    mini,
    small,
    medium,
    large
  );
  @mixin addCheckBoxSize($name) {
    .ty-check-box-#{$name} {
      height: var(--size-#{$name});
      width: var(--size-#{$name});
      line-height:var(--size-#{$name});
    }
  }

  @each $name in $inputSize {
    @include addCheckBoxSize($name);
  }
  input[type="checkbox"]:checked{
    background-color:var(--primary-6);
  }
  input[type=checkbox]:checked::after {
    box-sizing: border-box;
    content: '✔';
    color: white;
    position: absolute;
    width: 20px;
    height: 20px;
    left: 50%;
    top: 50%;
    line-height: 20px;
    transform: translate(-50%, -50%);
  }
}

</style>
