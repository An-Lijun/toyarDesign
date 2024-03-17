<template>
  <label class="ty-check-box"
    :class="{
      'ty-check-box-harf':props.canHarf,
      'ty-check-box-disabled':props.disabled
    }"
  >
    <input type="checkbox"
      @click="handleChange"
      :disabled="props.disabled"
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
import {useCompMvalue} from '../../hooks/useCompMvalue'
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
  },
  canHarf:{
    type:Boolean,
    default:false
  },
  disabled:{
    type:Boolean,
    default:true
  }
})
const emit = defineEmits(['update:modelValue','change'])
const handleChange=(val)=>{
  setTimeout(()=>{
    emit('change',val)
  })
  return val
}
const {model} =useCompMvalue(props,emit,{
  setFn:handleChange
})

</script>
<style lang="scss" scoped>
.ty-check-box{
  display:inline-flex;
  align-items:center;
  user-select:none;
  color: var(--text-1);
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
      font-size: calc(var(--size-#{$name})/2);
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
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.ty-check-box-harf{
  input[type=checkbox]:checked::after {
    box-sizing: border-box;
    content: '一';
    color: white;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.ty-check-box-disabled{
  color: var(--text-4);
  input{
    background-color: var(--fill-3);
  }
  input[type="checkbox"]:checked{
    background-color:var(--primary-3);
  }
}
</style>
