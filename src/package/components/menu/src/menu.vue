<template>
  <section class="ty-menu"
    :style="{
      width:'250px'
    }"
  >
  <header>
      <slot name="header"></slot>
  </header>
    <div class="ty-menu-inner">
      <slot></slot>
    </div>
  </section>
</template>
<script setup>
import {provideLevel} from "./hooks/level.ts";
provideLevel(0)

</script>
<style lang="scss" scoped>
.ty-menu{
  height:100%;
  background:var(--color-bg-2);
  padding: 0 5px;
  overflow: auto;
  transition: background-color 1s;
}
</style>
