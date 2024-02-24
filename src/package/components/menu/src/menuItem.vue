<template>
  <li class="ty-menu-item">
    <span class="ty-menu-item-index" v-for="item in compLevel">
    </span>
    <slot></slot>
  </li>
</template>
<script setup>
import {injectLevel} from "./hooks/level.ts";
const compLevel  =injectLevel()
console.log(compLevel,'child');
</script>
<style lang="scss" scoped>
.ty-menu-item {
  line-height: 40px;
  list-style: none;
  padding: 0 14px;
  border-radius: 5px;
  user-select: none;
  margin-bottom: 4px;
  &:hover {
    background-color: var(--toyar-gray-2);
  }
  .ty-menu-item-index{
    width: 20px;
    display: inline-block;
    height: 100%;
  }
}
</style>
