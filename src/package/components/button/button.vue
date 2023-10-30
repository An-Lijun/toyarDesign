<template>
  <button
    :type="htmlType"
    :class="[
        'ty-button',
        `ty-button-${state}`,
        `ty-button-${type}`,
        `ty-button-${size}`,
        `ty-button-${shape}`,
        { 
          'is-disabled': disabled,
          'is-block':block
        } 
    ]"
    :disabled="disabled"
    @click="handleClick"
    >
    <span v-if="type === 'link'">
      <slot></slot>
    </span>
    <slot v-else></slot>
    
  </button>
</template>

<script setup >
const props = defineProps({
  state: {
    type: String,
    default: "primary",
    validator: (value) => {
      return ["primary", "success", "warning", "danger"].includes(
        value
      );
    }
  },
  type:{
    type: String,
    default: "normal",
    validator: (value) => {
      return ["normal", "secondary",  "dashed",'text','link'].includes(
        value
      );
    }
  },
  block:{
    type:Boolean,
    default:false
  },
  disabled:{
    type:Boolean,
    default:false
  },
  size:{
    type: String,
    default: "small",
    validator: (value) => {
      return ["mini", "small",  "medium",'large'].includes(
        value
      );
    }
  },
  'html-type':{
    type: String,
    default: "button",
    validator: (value) => {
      return ["button", "submit", "reset"].includes(value);
    }
  },
  shape:{
    type: String,
    default: "square",
    validator: (value) => {
      return ["square", "round", "circle"].includes(
        value
      );
    }
  }
})
</script>
<style lang="scss" scoped>

// ------------------------  按钮base样式  ------------------------
.ty-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition:var(--time-1);
  font-weight: var(--font-weight-5);
  user-select: none;
  border: var(--border-1) solid;
  font-size: var(--font-body-3);
  border-radius: var(--border-radius-4);
  position: relative;

}
// ------------------------  按钮状态样式  ------------------------
@mixin addBtnState($state) {

  //基础按钮
  .ty-button-#{$state}.ty-button-normal {
    color: var(--text-0);
    background-color: var(--#{$state}-6);
    border-color: var(--#{$state}-6);
    &:hover,
    &:focus {
      background: var(--#{$state}-5);
      border-color: var(--#{$state}-5);
      color: var(--text-0);
    }
    &:active {
      border-color: var(--#{$state}-7);
      background-color: var(--#{$state}-7);
    }
  }
  
  // 次级按钮
  .ty-button-#{$state}.ty-button-secondary{
    background-color:unset;
    color: var(--#{$state}-6);
    border-color: var(--#{$state}-6);

    &:hover,
    &:focus {
      background: unset;
      color:  var(--#{$state}-5);
      border-color: var(--#{$state}-5);
    }
    &:active {
      background-color: unset;
      color:  var(--#{$state}-7);
      border-color: var(--#{$state}-7);
    }
  }
  
  // 虚线按钮
  .ty-button-#{$state}.ty-button-dashed{
    border:1px dashed;
    background-color: unset;
    color: var(--#{$state}-6);
    &:hover,
    &:focus {
      background: unset;
      color:  var(--#{$state}-5);
    }
    &:active {
      background-color: unset;
      color:  var(--#{$state}-7);
    }
  }


  // 文字按钮
  .ty-button-#{$state}.ty-button-text{
    color: var(--#{$state}-6);
    border: unset;
    background: unset;
    &:hover,
    &:focus {
      background: unset;
      color:  var(--#{$state}-5);
    }
    &:active {
      color:  var(--#{$state}-7);
    }
  }
  
  // 链接按钮
  .ty-button-#{$state}.ty-button-link{
    color: var(--#{$state}-6);
    border: unset;
    background: unset;
    span{
       border-bottom: 1px solid var(--#{$state}-6);
    }
    &:hover,
    &:focus {
      background: unset;
      color:  var(--#{$state}-5);
      span{
        border-bottom: 1px solid var(--#{$state}-5);
      }
    }
    &:active {
      color:  var(--#{$state}-7);
      span{
        border-bottom: 1px solid var(--#{$state}-7);
      }
    }
  }
   
  //基础按钮的禁用样式
  .ty-button-#{$state}.ty-button-normal.is-disabled {
    &,
    &:hover,
    &:focus,
    &:active {
      color: var(--text-0);
      cursor: no-drop;
      background-color: var(--#{$state}-3);
      border-color: var(--#{$state}-3);
    }
  }

  //次级按钮 虚线按钮 文字按钮 的禁用状态
  .ty-button-#{$state}.ty-button-secondary.is-disabled ,
  .ty-button-#{$state}.ty-button-dashed.is-disabled,
  .ty-button-#{$state}.ty-button-text.is-disabled
  {
    &,
    &:hover,
    &:focus,
    &:active {
      color: var(--#{$state}-3);
      cursor: no-drop;
      border-color: var(--#{$state}-3);
    }
  }
  // 链接按钮 的禁用状态
  .ty-button-#{$state}.ty-button-link.is-disabled  {
    &,
    &:hover,
    &:focus,
    &:active {
      color: var(--#{$state}-3);
      cursor: no-drop;
      border-color: var(--#{$state}-3);
      span{
        border-bottom: 1px solid var(--#{$state}-3);
      }
    }
  }

}
@each $state in 'primary','link','success','warning','danger' {
  @include addBtnState($state);
}
// ------------------------  按钮圆角样式  ------------------------
$btnShape:(
  square:(4),
  round:(16),
  circle:(circle)
);

@mixin addBtnShape($name,$value){
  .ty-button-#{$name} {
    border-radius: var(--border-radius-#{$value});
  }
}

@each $name,$value in $btnShape{
  @include addBtnShape($name,$value)
}
// ------------------------  按钮尺寸样式  ------------------------
$btnSize:(
  mini:(1),
  small:(3),
  medium:(3),
  large:(4)
);
@mixin addBtnSize($name,$value){
  .ty-button-#{$name} {
    height: var(--size-#{$name});
    line-height: var(--size-#{$name});
    padding: 0  var(--padding-#{$value});
  }
  .ty-button-#{$name}.ty-button-circle{
    height: var(--size-#{$name});
    width: var(--size-#{$name});
    padding: unset;
  }
}
@each $name,$value in $btnSize{
  @include addBtnSize($name,$value)
}

// ------------------------  按钮block  ------------------------
.ty-button.is-block{
  width: 100%;
}

</style>
