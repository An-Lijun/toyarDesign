<template>
  <div :class="[nm.b(),nm.bem('','',shape)]">
    <img :src="src" :alt="alt" :style="{
      width: `${size}px`, 
      height: `${size}px`, 
      objectFit: fit
    }"></div>
</template>
<script setup lang="ts" name="TyImage">
import {imgProps,nm} from './context'
defineOptions({
  name:'TyImage'
})
defineProps(imgProps)
</script>
