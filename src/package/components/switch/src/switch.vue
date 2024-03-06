<template>
  <div
    :class="[
      'ty-switch',
      `ty-switch-${size}`,
      `ty-switch-${type}`,
      {
        isOpen: isOpen
      }
    ]"
    @click="change"
  >
    <span v-if="props.checkedText && isOpen" class="checkedText">
      {{ props.checkedText }}
    </span>
    <div class="ty-switch-boll"></div>
    <span v-if="props.uncheckedText && !isOpen" class="uncheckedText">
      {{ props.uncheckedText }}
    </span>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useCompMvalue } from '../../../hooks/useCompMvalue'

const props = defineProps({
  size: {
    type: String,
    default: 'small',
    validator: value => {
      return ['mini', 'small', 'medium', 'large'].includes(value)
    }
  },
  uncheckedText: {
    type: String,
    default: ''
  },
  checkedText: {
    type: String,
    default: ''
  },
  modelValue: {
    type: Boolean,
    required: true,
    default: false
  },
  openValue:{
    type:String,
  },
  closeValue:{
    type:String,
  },
  type:{
    type:String,
    default: 'round',
      validator: value => {
        return ['round', 'tube', 'inline'].includes(value)
      }
    }
})
const emit = defineEmits(['update:modelValue'])
const { model } = useCompMvalue(props, emit)
const isOpen =computed(()=>{
  if (typeof model.value === 'boolean') {
    return model.value
  }
  return model.value === props.openValue
})
const change = () => {
  if (typeof model.value === 'boolean') {
   return model.value = !model.value
  }
  model.value = model.value===props.openValue? props.closeValue:props.openValue
}
</script>
<style lang="scss" scoped>
.ty-switch {
  background-color: var(--fill-4);
  width: 30px;
  height: 20px;
  display: flex;
  align-items: center;
  border-radius: 30px;
  padding: 1px 5px;
  position: relative;
  transition: all 0.3s;
  color: #fff;
  font-size: var(--font-body-3);
  user-select: none;
  justify-content: end;

  &:hover {
    cursor: pointer;
  }
  .ty-switch-boll {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    transition: all 0.5s;
  }
  &.ty-switch-tube{
    border-radius: 4px;
    .ty-switch-boll{
      border-radius: 4px;
    }
  }
  &.ty-switch-inline{
    border-radius: 4px;
    height: 6px;
    .ty-switch-inline{
      border-radius: 4px;
    }
  }
  
}
$size: (
  mini: (
    1
  ),
  small: (
    2
  ),
  medium: (
    3
  ),
  large: (
    4
  )
);
@mixin addSize($name, $value) {
  .ty-switch-#{$name} {
    height: var(--size-#{$name});
    line-height: var(--size-#{$name});
    padding: 0 var(--padding-#{$value});
    width: calc(var(--size-#{$name}));
    font-size: var(--padding-#{$value});
    .ty-switch-boll {
      height: calc(var(--size-#{$name}) - var(--padding-#{$value}));
      width: calc(var(--size-#{$name}) - var(--padding-#{$value}));
      left: calc(var(--padding-#{$value}) / 2);
    }
    &.isOpen {
      background-color: var(--primary-6);
      .ty-switch-boll {
        right: calc(var(--padding-#{$value}) / 2);
        left: unset;
      }
      justify-content: start;
    }
  }
  // .ty-button-#{$name}.ty-button-circle{
  //   height: var(--size-#{$name});
  //   width: var(--size-#{$name});
  //   padding: unset;
  // }
}
@each $name, $value in $size {
  @include addSize($name, $value);
}

</style>
