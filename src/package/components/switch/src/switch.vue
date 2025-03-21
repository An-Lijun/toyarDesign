<template>
  <div
    :class="[
      nm.b(),
      nm.m(size),
      nm.m(type),
      nm.is('open',isOpen),
      nm.is('disabled', disabled),
    ]"
    @click="click"
  >
    <span v-if="props.checkedText && isOpen" class="checkedText">
      {{ props.checkedText }}
    </span>
    <div :class="nm.e('boll')"></div>
    <span v-if="props.uncheckedText && !isOpen" class="uncheckedText">
      {{ props.uncheckedText }}
    </span>
  </div>
</template>
<script setup>
import { computed,inject } from 'vue';
import { useCompMvalue } from '../../../hooks/useCompMvalue'
import {switchProps,switchEmits,nm} from './context'
import {
  formContent,
  formItemContent
} from '../../../hooks/symbolNm'
defineOptions({
  name:'TySwitch'
})

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)
const tyForm = inject(formContent, null)
const tyFormItem = inject(formItemContent, null)

const model =defineModel('modelValue',{
  type:[Array,String,Number,Boolean],
  required:true
})
// const { model } = useCompMvalue(props, emit)
const isOpen =computed(()=>{
  if (typeof model.value === 'boolean') {
    return model.value
  }
  return model.value === props.openValue
})

// computed 继承属性
const disabled = computed(() => {
  return props.disabled || tyFormItem?.disabled || tyForm?.disabled || false
})

const click = () => {
  if(props.disabled){
    return
  }
  model.value = model.value===props.openValue? props.closeValue:props.openValue
  emit('change',model.value)
}
</script>
<style lang="scss" scoped>
.ty-switch {
  background-color: var(--fill-4);
  width: 30px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  border-radius: 30px;
  padding: 1px 5px;
  position: relative;
  transition: all 0.3s;
  color: #fff;
  font-size: var(--font-body-3);
  user-select: none;
  justify-content: end;
  box-sizing: content-box;

  &:hover {
    cursor: pointer;
  }
  &__boll {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    transition: all 0.5s;
  }
  &--tube{
    border-radius: 4px;
    .ty-switch__boll{
      border-radius: 4px;
    }
  }
  &--inline{
    border-radius: 4px;
    height: 6px;
    .ty-switch-inline{
      border-radius: 4px;
    }
  }
  &.is-disabled{
    color: var(--text-4);
    background-color: var(--fill-3);
    &:hover{
      cursor: not-allowed;
    }
  }
  &.is-disabled.is-open{
    background-color: var(--primary-3);
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
  .ty-switch--#{$name} {
    height: var(--size-#{$name});
    line-height: var(--size-#{$name});
    padding: 0 var(--padding-#{$value});
    width: calc(var(--size-#{$name}));
    font-size: var(--padding-#{$value});
    .ty-switch__boll {
      height: calc(var(--size-#{$name}) - var(--padding-#{$value}));
      width: calc(var(--size-#{$name}) - var(--padding-#{$value}));
      left: calc(var(--padding-#{$value}) / 2);
    }
    &.is-open {
      background-color: var(--primary-6);
      .ty-switch__boll {
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
