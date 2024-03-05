<template>
  <div class="ty-badge"

    :class="[{dot: props.type === 'dot'},[`ty-badge-${props.status}`]]"
  >
      <slot></slot> 
      <span class="ty-badge-text">
        {{ text }}
      </span>
  </div>
</template>
<script setup>
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: ""
  },
  max:{
    type:String||Number,
    default:99
  },
  type:{
    type:String,
    default:'text'
    // text dot
  },
  status:{
    type:String,
    default:'danger'
  }
})
const text = computed(()=>{
  if(props.type !== 'text'){
    return ''
  }
  if(!isNaN(props.text)){
    return props.text > props.max ?props.max+'⁺':props.text
  }
  return props.text
})
</script>
<style lang="scss" scoped>
.ty-badge{
  position: relative;
  display: inline;
  .ty-badge-text{
    position: absolute;
    top: 2px;
    right: 2px;
    transform: translate(50%,-50%);
    border-radius: 20px;
    padding:0 6px;
    min-width: 20px;
    font-size: 12px;
    box-shadow: 0 0 0 2px #fff;
    color: #fff;
    height: 20px;
    line-height: 20px;
    text-align: center;
    user-select: none;
    
  }
  &.dot{
    .ty-badge-text{
      top: 2px;
      right: 2px;
      width: 10px;
      min-width: 10px;
      height: 10px;
      border-radius: 50%;
      line-height: 4px;
      padding: unset;
    }
  }
}
@mixin addState($state) {
  //基础按钮
  .ty-badge-#{$state} > .ty-badge-text {
    background-color: var(--#{$state}-6);
  }
}
@each $state in 'primary','success','warning','danger' {
  @include addState($state);
}
</style>
