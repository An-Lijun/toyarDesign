<template>
  <li :class="nm.bem('item')">
    <span :class="nm.bem('item','index')" 
     v-for="item in compLevel">
    </span>
    <slot></slot>
  </li>
</template>
<script setup>
import {nm} from './context'
import {injectLevel} from "./hooks/level.ts";
defineOptions({
  name:'TyMenuItem'
})
const compLevel  =injectLevel()
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
  &__index{
    width: 20px;
    display: inline-block;
    height: 100%;
  }
}
</style>
