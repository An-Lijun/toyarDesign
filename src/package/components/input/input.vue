<template>
  <div class="ty-input">
      <div class="ty-input-outPre" ref="outPre">
        <slot name="outPre"></slot>
      </div>
      <span  class="ty-input-innerPre" 
        ref="innerPre"
        :style="{
          transform: `translateX(${outPreWidth}px)`
        }"
      >
        <slot  name="innerPre" ></slot>
      </span>
      <input type="text"
      :class="[{
         'is-outPre': outPreWidth>0,
         'is-outAft':outAftWidth>0
      }]"
       :style="[
        {
          paddingLeft: `${innerPreWidth + 10}px`,
          paddingRight:`${innerAftWidth + 10}px`,
        }
       ]"
      >
      <span ref="innerAft" class="ty-input-innerAft"
        :style="{
          transform: `translateX(-${outAftWidth}px)`
        }"
      >
        <slot  name="innerAft" ></slot>
      </span>
      <span 
        class="ty-input-clear"
        :style="{
          transform: `translateX(-${outAftWidth}px)`
        }"
      >
         
      </span>
      <div class="ty-input-outAft" 
        ref="outAft"
      >
          <slot name="outAft"></slot>
      </div>
  </div>
</template>
<script setup lang="ts">
import {ref ,onMounted} from 'vue'
  const outPre =ref();
  const innerPre =ref();
  const outAft =ref();
  const innerAft =ref();

  let  outPreWidth = ref(0);
  let  innerPreWidth = ref(0);
  let  outAftWidth = ref(0);
  let  innerAftWidth = ref(0);
  onMounted(() => {
    outPreWidth.value = outPre?.value?.clientWidth
    innerPreWidth.value = innerPre?.value?.clientWidth
    outAftWidth.value = outAft?.value?.clientWidth
    innerAftWidth.value = innerAft?.value?.clientWidth
  })

</script>
<style lang="scss" scoped>
.ty-input{
  display:flex;
  height: var(--size-small);
  width: 100%;
  position: relative;
  color: var(--text-3);
  font-size: var(--font-body-3);
  .ty-input-outPre{
    border: var(--border-1) solid;
    border-color: var(--toyar-gray-8);
    border-radius: var(--border-radius-4) 0 0 var(--border-radius-4);
    margin-right: -1px;

    display: flex;
    align-items: center;
    ::v-deep() .ty-button{
      // background-color: red !important;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      margin-left: -1px;
    }
  }

  .ty-input-innerPre{
    height: 100%;
    display: flex;
    left: 5px;
    position: absolute;
    align-items: center;
  }
  input{
    width: 0;
    flex-grow: 1;
    padding: unset;
    border: var(--border-1) solid;
    border-color: var(--toyar-gray-8);
    box-sizing: border-box;
    border-radius: var(--border-radius-4);
    outline:unset;
    color: var(--text-3);

    &:focus{
        border-color: var(--primary-6);
    }
    &.is-outPre{
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &.is-outAft{
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    // &:placeholder-shown {
    //   background-color: red;
    // }
  }
  .ty-input-innerAft{
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    right: 5px;
  }
  .ty-input-outAft{
      border: var(--border-1) solid;
      border-color: var(--toyar-gray-8);
      border-radius:  0 var(--border-radius-4) var(--border-radius-4) 0 ;

      display: flex;
      align-items: center;
      ::v-deep() .ty-button{
        // background-color: red !important;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        margin-right: -1px;
        margin-left: -1px;

      }
  }
}
</style>
