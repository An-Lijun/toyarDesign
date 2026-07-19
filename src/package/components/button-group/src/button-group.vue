<template>
  <div :class="nm.b()">
    <slot></slot>
  </div>
</template>
<script setup>
import {nm} from './context'
defineOptions({
  name:'TyButtonGroup'
})
</script>

