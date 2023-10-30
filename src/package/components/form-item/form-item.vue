<template>
  <div class="ty-form-item">
      <label 
        class="ty-form-label"
        :style="{
          display:'block',
          wordBreak: 'break-all',
          width:`${tyForm.props.labelWidth}px`
        }"
      > 
        <template v-if="tyForm.props.label">
          {{ tyForm.props.label }}
        </template>
        <slot name="label" v-else></slot>
      </label>
      <div class="ty-form-item-content"
      >
         <slot></slot>
      </div>
  </div>
</template>
<script setup>
import { inject } from "vue";
const tyForm = inject("tyForm");

</script>
<style lang="scss" scoped>
.ty-form-item{
  display:flex;
  align-items: center;
  .ty-form-label{
    width:100px;
    text-align:right;
    &:before{
      content:'*';
      color:red
    }
    &:after{
      content:': ';
      margin-right: 5px;
    }
  }
  .ty-form-item-content{
    flex:1;
  }
}
</style>
