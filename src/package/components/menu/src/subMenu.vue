<template>
  <div class="ty-sub-menu"  >
    <div class="ty-sub-menu-inner" @click="openChildMenu">
      <span class="ty-sub-menu-index" v-for="item in compLevel">
      </span>
      <div class="ty-sub-menu_icon" 
        :style="{
          '--toyar-gray-10': flag? 'var(--toyar-xblue-6)':''
        }"
      >
        <slot name="icon"></slot>
      </div>
      <div div class="ty-sub-menu_text">
        <slot name="title"></slot>
      </div>
      <div class="ty-sub-menu_flag" :class="{
          opened: flag
        }
        ">
        <TyIcon icon="ty-arrow-down-s-line"></TyIcon>
      </div>
    </div>
    <ul class="ty-sub-menu-content"  
      v-show="flag"
    > 
    <!-- -->
      <slot></slot>
    </ul>
  </div>
</template>
<script setup>
import {injectLevel} from "./hooks/level.ts";

let flag = ref(false)
const compLevel =injectLevel(true)
console.log(compLevel);
const openChildMenu = () => {
  flag.value = !flag.value
}
</script>
<style lang="scss" scoped>
.ty-sub-menu {
  width: 100%;
  color: var(--text-2);

  .ty-sub-menu-inner {
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    border-radius: 5px;
    user-select: none;
    .ty-sub-menu-index{
      width: 10px;
      display: inline-block;
      height: 100%;
    }
    .ty-sub-menu_icon{
      width: 50px;
      min-width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ty-sub-menu_text{
      flex: 1;
    }
    .ty-sub-menu_flag{
      width: 40px;
      min-width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:hover {
      background-color: var(--toyar-gray-2);
    }

    .ty-sub-menu_flag.opened {
      transform: rotate(180deg);
    }
  }
  .ty-sub-menu-content{
    margin: unset;
    padding: unset;
    // padding-left: 10px;
    transition: all 2s;

  }
}
</style>
